import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yvhoggnkmrfnxhjxqdkc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2aG9nZ25rbXJmbnhoanhxZGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjEzMTIsImV4cCI6MjA3OTgzNzMxMn0.OsYmMMOt23KlJb1MqeoZQUEDIewNUb_BZ21WOLyxTSo';

// GET - Get all users (for admin)
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('[USERS API] Getting all users...');

    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, phone, avatar, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[USERS API] Error:', error);
      throw error;
    }

    console.log('[USERS API] Found users:', users?.length);

    return NextResponse.json({
      success: true,
      users: users || [],
      total: users?.length || 0
    });

  } catch (error) {
    console.error('[USERS API] Server error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user by ID (for admin)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID harus diisi' },
        { status: 400 }
      );
    }

    console.log('[USERS API] Deleting user:', userId);

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('[USERS API] Delete error:', error);
      throw error;
    }

    console.log('[USERS API] User deleted successfully');

    return NextResponse.json({
      success: true,
      message: 'User berhasil dihapus'
    });

  } catch (error) {
    console.error('[USERS API] Server error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
