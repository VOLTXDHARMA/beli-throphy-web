import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GANTI INI dengan credentials Supabase kamu
const supabaseUrl = 'https://yvhoggnkmrfnxhjxqdkc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2aG9nZ25rbXJmbnhoanhxZGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjEzMTIsImV4cCI6MjA3OTgzNzMxMn0.OsYmMMOt23KlJb1MqeoZQUEDIewNUb_BZ21WOLyxTSo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    console.log('[REGISTER] Request:', { name, email, password: '***' });

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter' },
        { status: 400 }
      );
    }

    // Connect to Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if email exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email);

    console.log('[REGISTER] Check existing:', { existingUsers, checkError });

    if (checkError) {
      console.error('[REGISTER] Check error:', checkError);
      return NextResponse.json(
        { error: 'Terjadi kesalahan saat memeriksa email' },
        { status: 500 }
      );
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      );
    }

    // Insert new user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ name, email, password }])
      .select()
      .single();

    console.log('[REGISTER] Insert result:', { newUser, insertError });

    if (insertError) {
      console.error('[REGISTER] Insert error FULL:', JSON.stringify(insertError, null, 2));
      return NextResponse.json(
        { 
          error: `Gagal membuat akun: ${insertError.message}`,
          details: insertError.details || 'No details',
          hint: insertError.hint || 'No hint',
          code: insertError.code || 'No code'
        },
        { status: 500 }
      );
    }

    if (!newUser) {
      console.error('[REGISTER] No user returned after insert');
      return NextResponse.json(
        { error: 'User tidak berhasil dibuat (no data returned)' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      token: `user_${newUser.id}_${Date.now()}`
    }, { status: 201 });

  } catch (error: any) {
    console.error('[REGISTER] Server error:', error);
    return NextResponse.json(
      { error: `Terjadi kesalahan server: ${error.message}` },
      { status: 500 }
    );
  }
}
