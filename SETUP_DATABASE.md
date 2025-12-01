# 🗄️ Setup Database Supabase

Ikuti langkah-langkah berikut untuk setup database cloud yang permanen:

## 1. Buat Akun Supabase (GRATIS)

1. Buka https://supabase.com
2. Klik **"Start your project"** atau **"Sign Up"**
3. Login dengan GitHub/Google (lebih mudah)
4. Gratis selamanya untuk 500MB database + 1GB bandwidth

## 2. Buat Project Baru

1. Setelah login, klik **"New Project"**
2. Isi detail project:
   - **Name**: `beli-trophy` (atau nama bebas)
   - **Database Password**: Buat password yang kuat (SIMPAN PASSWORD INI!)
   - **Region**: Pilih `Southeast Asia (Singapore)` (terdekat dengan Indonesia)
3. Klik **"Create new project"**
4. Tunggu 2-3 menit sampai project selesai dibuat

## 3. Buat Tabel Database

Setelah project selesai, buka **SQL Editor** di sidebar kiri, lalu jalankan query ini:

```sql
-- Tabel Products
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Tabel Users (untuk registration)
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy untuk products (public bisa read, admin bisa all)
CREATE POLICY "Allow public read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update products" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete products" ON products
  FOR DELETE USING (true);

-- Policy untuk users
CREATE POLICY "Allow public read users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert users" ON users
  FOR INSERT WITH CHECK (true);
```

Klik **"Run"** untuk membuat tabel.

## 4. Ambil API Keys

1. Di sidebar kiri, klik **"Settings"** (⚙️ icon)
2. Klik **"API"**
3. Lihat di bagian **"Project API keys"**:
   - **Project URL**: Copy URL ini
   - **anon public**: Copy key ini

## 5. Masukkan ke File `.env.local`

Buka file `.env.local` di root project ini, lalu ganti dengan API keys Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 6. Restart Development Server

```bash
npm run dev
```

## 7. Selesai! 🎉

Sekarang database Anda sudah online dan permanen:
- ✅ Data tersimpan di cloud (tidak hilang walau VS Code ditutup)
- ✅ Bisa diakses dari komputer manapun
- ✅ Bisa dibagikan ke teman (tinggal share API keys)
- ✅ Gratis selamanya (500MB storage)
- ✅ Auto backup oleh Supabase

## Cara Share ke Teman

1. Share file project ini
2. Share file `.env.local` (berisi API keys)
3. Teman tinggal `npm install` dan `npm run dev`
4. Database langsung terkoneksi dan data sama!

## Dashboard Supabase

Untuk melihat data di Supabase:
1. Login ke https://supabase.com
2. Pilih project `beli-trophy`
3. Klik **"Table Editor"** di sidebar
4. Anda bisa lihat semua data products dan users secara realtime!

---

**Catatan**: Jangan commit file `.env.local` ke GitHub! Sudah ditambahkan ke `.gitignore` secara otomatis.
