# 🔧 SETUP LOGIN & REGISTER - PANDUAN LENGKAP

## ⚠️ LANGKAH WAJIB - IKUTI URUTAN INI!

### 1️⃣ SETUP DATABASE SUPABASE (WAJIB!)

**Tanpa langkah ini, login/register TIDAK AKAN JALAN!**

1. Buka browser → [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Login ke akun Supabase kamu
3. Pilih project: **yvhoggnkmrfnxhjxqdkc**
4. Di menu kiri, klik **SQL Editor**
5. Klik tombol **New query**
6. Copy SELURUH SQL di bawah dan paste ke editor:

```sql
-- =========================================
-- HAPUS TABEL LAMA DAN BUAT ULANG (CLEAN)
-- =========================================

drop table if exists public.users cascade;

create table public.users (
  id         bigserial primary key,
  name       text not null,
  email      text unique not null,
  password   text not null,
  phone      text,
  avatar     text,
  created_at timestamptz default timezone('utc', now())
);

-- =========================================
-- RLS & POLICY
-- =========================================

alter table public.users enable row level security;

create policy "Allow anon read users"
on public.users for select to anon using (true);

create policy "Allow anon insert users"
on public.users for insert to anon with check (true);

create policy "Allow anon update users"
on public.users for update to anon using (true) with check (true);

-- =========================================
-- USER TEST
-- =========================================

insert into public.users (name, email, password)
values ('User Test', 'test@example.com', '123456');
```

7. Klik tombol **Run** (atau tekan Ctrl+Enter)
8. Harus muncul: **Success. No rows returned**

### 2️⃣ VERIFIKASI DATABASE

1. Di Supabase, klik menu **Table Editor** (di kiri)
2. Pilih tabel **users**
3. PASTIKAN ada:
   - Kolom: `id`, `name`, `email`, `password`, `phone`, `avatar`, `created_at`
   - 1 baris data: email = `test@example.com`, password = `123456`

**KALAU TIDAK ADA, ULANGI LANGKAH 1!**

---

## 3️⃣ TEST REGISTER (Daftar User Baru)

1. Pastikan dev server jalan: `npm run dev`
2. Buka browser: **http://localhost:3000/login**
3. Klik tombol **"Daftar"** (toggle dari Login)
4. Isi form:
   - **Nama**: `Budi Test`
   - **Email**: `budi@example.com`
   - **Password**: `123456`
   - **Konfirmasi Password**: `123456`
5. Klik tombol **Daftar**

### ✅ Yang HARUS Terjadi:

- Muncul pesan hijau: **"Registrasi berhasil! Selamat datang!"**
- Halaman redirect otomatis ke home (`/`)
- Navbar berubah: muncul **avatar nama** (huruf B) + dropdown menu

### 🔍 Cek Console (F12):

1. Tekan **F12** di browser
2. Tab **Console**
3. Harus ada log:
   ```
   [REGISTER] Request: {name: "Budi Test", email: "budi@example.com", password: "***"}
   [REGISTER] Check existing: {existingUsers: [], checkError: null}
   [REGISTER] Insert result: {newUser: {...}, insertError: null}
   [REGISTER] Response: {success: true, ...}
   ```

### 🗄️ Cek Supabase:

1. Kembali ke Supabase → **Table Editor** → tabel **users**
2. Refresh (F5)
3. HARUS ADA baris baru: `budi@example.com`

**KALAU TIDAK MUNCUL:**
- Cek tab **Console** di browser, cari log `[REGISTER]`
- Kalau ada error merah, copy paste SEMUA teks error tersebut
- Kalau ada `insertError: {...}`, itu berarti policy RLS blokir → **ULANGI LANGKAH 1**

---

## 4️⃣ TEST LOGIN

1. Di halaman `/login`, toggle ke **"Masuk"**
2. Isi:
   - **Email**: `test@example.com`
   - **Password**: `123456`
3. Klik **Masuk**

### ✅ Yang HARUS Terjadi:

- Pesan hijau: **"Login berhasil! Mengalihkan..."**
- Redirect ke home
- Navbar berubah jadi avatar + menu profil

### 🔍 Cek Console:

```
[LOGIN] Request: {email: "test@example.com", password: "***"}
[LOGIN] Supabase response: {users: [{id: 1, name: "User Test", ...}], error: null}
[LOGIN] Response: {success: true, ...}
```

### 🗃️ Cek LocalStorage (F12):

1. Tab **Application** → kiri pilih **Local Storage** → `http://localhost:3000`
2. Harus ada:
   - `userId` = `1`
   - `userToken` = `user_1_...`
   - `currentUser` = `{"id":1,"name":"User Test","email":"test@example.com"}`

---

## ❌ TROUBLESHOOTING

### Error: "Email sudah terdaftar"
→ Ganti email dengan yang lain (misal `budi2@example.com`)

### Error: "Gagal membuat akun: new row violates row-level security policy"
→ **POLICY RLS belum di-set!** Ulangi Langkah 1, pastikan SQL di-run SEMUA.

### Error: "Terjadi kesalahan saat memeriksa email"
→ Database tidak konek. Cek:
1. URL Supabase di `app/api/auth/register/route.ts` baris 5
2. Anon key di baris 6
3. Pastikan project Supabase aktif

### User baru TIDAK MUNCUL di tabel Supabase
→ Buka Console browser (F12), cari log `[REGISTER] Insert result:`
→ Kalau ada `insertError: {...}`, kirim error tersebut ke developer

### Navbar tetap "Login" meskipun sudah login
→ Refresh halaman (F5) atau:
1. F12 → Application → Local Storage
2. Cek apakah `userId` dan `userToken` ada
3. Kalau ada tapi navbar tetap, clear cache dan refresh

---

## 📋 CHECKLIST AKHIR

- [ ] SQL di Supabase sudah di-run
- [ ] Tabel `users` ada dan terisi `test@example.com`
- [ ] Dev server jalan di `http://localhost:3000`
- [ ] Register user baru berhasil → muncul di Supabase
- [ ] Login berhasil → redirect + navbar berubah
- [ ] LocalStorage terisi `userId`, `userToken`, `currentUser`

**KALAU SEMUA CHECKLIST ✅, SISTEM LOGIN SUDAH BERFUNGSI 100%!**

---

## 🆘 MASIH GAGAL?

Kirim ke developer:
1. Screenshot **Console** (F12) saat klik Daftar/Masuk
2. Screenshot tabel **users** di Supabase
3. Isi **error** yang muncul (merah) di halaman login
