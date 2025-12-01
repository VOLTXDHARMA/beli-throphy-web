# 🗄️ SQL DATABASE LENGKAP - PRODUCTS & USERS

## Copy & Paste ke Supabase SQL Editor

```sql
-- =========================================
-- TABEL PRODUCTS
-- =========================================

drop table if exists public.products cascade;

create table public.products (
  id          bigserial primary key,
  name        text not null,
  price       numeric not null,
  description text not null,
  image       text not null,
  category    text not null,
  created_at  timestamptz default timezone('utc', now())
);

-- =========================================
-- TABEL USERS (sudah ada, tapi biar lengkap)
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
-- AKTIFKAN RLS
-- =========================================

alter table public.products enable row level security;
alter table public.users enable row level security;

-- =========================================
-- POLICY PRODUCTS (CRUD PUBLIK)
-- =========================================

create policy "Allow anon read products"
on public.products for select to anon using (true);

create policy "Allow anon insert products"
on public.products for insert to anon with check (true);

create policy "Allow anon update products"
on public.products for update to anon using (true);

create policy "Allow anon delete products"
on public.products for delete to anon using (true);

-- =========================================
-- POLICY USERS
-- =========================================

create policy "Allow anon read users"
on public.users for select to anon using (true);

create policy "Allow anon insert users"
on public.users for insert to anon with check (true);

create policy "Allow anon update users"
on public.users for update to anon using (true) with check (true);

-- =========================================
-- DATA CONTOH
-- =========================================

-- User test
insert into public.users (name, email, password)
values ('User Test', 'test@example.com', '123456');

-- Produk contoh
insert into public.products (name, price, description, image, category)
values 
  ('Piala Emas Premium', 250000, 'Piala emas berkualitas tinggi untuk penghargaan', 'https://images.unsplash.com/photo-1511376868136-742c0de8c56a', 'Premium'),
  ('Piala Perak Elegan', 150000, 'Piala perak dengan desain elegan', 'https://images.unsplash.com/photo-1599459182681-61cb03c56d72?w=400', 'Umum'),
  ('Piala Kristal Modern', 350000, 'Piala kristal dengan desain modern dan mewah', 'https://images.unsplash.com/photo-1604537529586-c7f41cb34f51?w=400', 'Premium');
```

## ✅ Setelah Run SQL:

1. Cek **Table Editor** → `products` (harus ada 3 produk)
2. Cek **Table Editor** → `users` (harus ada 1 user)
3. Test admin dashboard: http://localhost:3000/admin/login
   - Email: `admin@belitrophy.com`
   - Password: `admin123`
4. Test user profile: Login dulu, lalu klik avatar → Pengaturan Profil
