import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    if (!id) return NextResponse.json({ error: 'Invalid user id' }, { status: 400 });

    const body = await request.json();
    const { oldPassword, newPassword } = body || {};

    if (!newPassword || typeof newPassword !== 'string') {
      return NextResponse.json({ error: 'New password required' }, { status: 400 });
    }

    // Verify old password if provided
    if (oldPassword) {
      const { data: existing, error: readErr } = await supabase
        .from('users')
        .select('id')
        .eq('id', id)
        .eq('password', oldPassword)
        .single();

      if (readErr) throw readErr;
      if (!existing) {
        return NextResponse.json({ error: 'Old password is incorrect' }, { status: 400 });
      }
    }

    const { data, error } = await supabase
      .from('users')
      .update({ password: newPassword })
      .eq('id', id)
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, userId: data.id });
  } catch (err) {
    console.error('POST /api/users/[id]/password error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
