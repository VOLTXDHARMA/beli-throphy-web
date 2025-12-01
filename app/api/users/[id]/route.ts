import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    if (!id) return NextResponse.json({ error: 'Invalid user id' }, { status: 400 });

    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, phone, avatar, created_at')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ user: data });
  } catch (err) {
    console.error('GET /api/users/[id] error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    if (!id) return NextResponse.json({ error: 'Invalid user id' }, { status: 400 });

    const body = await request.json();
    const { name, email, phone, avatar } = body || {};

    const updates: Record<string, any> = {};
    if (typeof name === 'string') updates.name = name;
    if (typeof email === 'string') updates.email = email;
    if (typeof phone === 'string') updates.phone = phone;
    if (typeof avatar === 'string') updates.avatar = avatar;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select('id, name, email, phone, avatar, created_at')
      .single();

    if (error) throw error;

    return NextResponse.json({ user: data });
  } catch (err) {
    console.error('PATCH /api/users/[id] error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
