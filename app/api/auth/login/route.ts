import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GANTI INI dengan credentials Supabase kamu
const supabaseUrl = 'https://yvhoggnkmrfnxhjxqdkc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2aG9nZ25rbXJmbnhoanhxZGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjEzMTIsImV4cCI6MjA3OTgzNzMxMn0.OsYmMMOt23KlJb1MqeoZQUEDIewNUb_BZ21WOLyxTSo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('[LOGIN] Request:', { email, password: '***' });

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    // Admin bypass
    if (email === 'admin@belitrophy.com' && password === 'admin123') {
      console.log('[LOGIN] Admin login successful');
      return NextResponse.json({
        success: true,
        message: 'Login admin berhasil',
        user: {
          id: 0,
          name: 'Administrator',
          email: 'admin@belitrophy.com',
          role: 'admin'
        },
        token: `admin_${Date.now()}`,
        isAdmin: true,
        redirectTo: '/admin/dashboard'
      });
    }

    // Connect to Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find user
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password);

    console.log('[LOGIN] Supabase response:', { users, error });

    if (error) {
      console.error('[LOGIN] Database error:', error);
      return NextResponse.json(
        { error: 'Terjadi kesalahan saat login' },
        { status: 500 }
      );
    }

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const user = users[0];

    console.log('[LOGIN] User login successful:', user.email);
    return NextResponse.json({
      success: true,
      message: 'Login berhasil',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'user'
      },
      token: `user_${user.id}_${Date.now()}`,
      isAdmin: false,
      redirectTo: '/'
    });

  } catch (error) {
    console.error('[LOGIN] Server error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
