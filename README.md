# 🏆 Beli Trophy - Web Penjualan Trophy & Piala

Website e-commerce untuk penjualan trophy, piala, medali, dan plakat dengan sistem admin dashboard untuk manajemen produk.

---

## 📋 Deskripsi Project

**Beli Trophy** adalah aplikasi web berbasis Next.js yang memungkinkan:
- **User**: Melihat katalog produk trophy, mendaftar, dan login
- **Admin**: Mengelola produk (tambah, edit, hapus) melalui dashboard khusus

---

## 🛠️ Teknologi yang Digunakan

### Frontend & Framework
- **Next.js 16.0.5** - React framework dengan App Router
- **React 19.2.0** - Library UI
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling framework
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - PostgreSQL database & authentication
- **Prisma ORM** - Database client & schema management
- **Next.js API Routes** - Backend API endpoints

### Deployment
- **Vercel** - Hosting platform (recommended)

---

## 🚀 Cara Install & Menjalankan Project

### 1. Prerequisites (Software yang Harus Diinstall)

Pastikan sudah terinstall:
- **Node.js** (versi 18 atau lebih baru) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

### 2. Clone Repository

```bash
git clone https://github.com/VOLTXDHARMA/beli-throphy-web.git
cd beli-throphy-web
```

### 3. Install Dependencies

```bash
npm install
```

Ini akan menginstall semua package yang diperlukan:
- next, react, react-dom
- @supabase/supabase-js
- @prisma/client
- lucide-react
- tailwindcss
- typescript

### 4. Setup Environment Variables

Buat file `.env.local` di root project:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database URL untuk Prisma (Optional)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres
```

**Cara mendapatkan credentials Supabase:**
1. Buka [https://supabase.com](https://supabase.com)
2. Login/Signup
3. Create New Project
4. Di Settings → API, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon/Public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Di Settings → Database, copy Connection String untuk `DATABASE_URL`

### 5. Setup Database (Supabase)

#### A. Buat Tabel Users
Jalankan SQL ini di Supabase SQL Editor:

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy untuk anonymous access (untuk development)
CREATE POLICY "Allow anonymous access" ON users
  FOR ALL USING (true);
```

#### B. Buat Tabel Products
```sql
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy untuk read public
CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (true);

-- Policy untuk admin insert/update/delete
CREATE POLICY "Allow admin full access" ON products
  FOR ALL USING (true);
```

#### C. Insert Admin User (Default)
```sql
INSERT INTO users (name, email, password) VALUES
('Admin', 'admin@belitrophy.com', 'admin123');
```

### 6. Setup Prisma (Optional - untuk ORM)

```bash
# Generate Prisma Client
npx prisma generate

# Pull schema dari database
npx prisma db pull
```

### 7. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:3000**

---

## 📁 Struktur Project

```
beli-throphy/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── login/
│   │   └── page.tsx          # Halaman login user/admin
│   ├── produk/
│   │   ├── page.tsx          # Katalog produk
│   │   └── [id]/page.tsx     # Detail produk
│   ├── more-info/
│   │   └── page.tsx          # Info lebih lanjut
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── page.tsx      # Dashboard admin (CRUD produk)
│   │   ├── users/
│   │   │   └── page.tsx      # Redirect ke dashboard (disabled)
│   │   └── login/
│   │       └── page.tsx      # Login admin
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts    # API login
│       │   └── register/route.ts # API register
│       └── users/route.ts        # API user management
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── ProductCard.tsx       # Card komponen produk
│   └── LoginModal.tsx        # Modal login
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── prisma.ts             # Prisma client
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
├── .env.local                # Environment variables (tidak di-commit)
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
└── next.config.ts            # Next.js config
```

---

## 🔐 Akun Login Default

### Admin
- **Email**: `admin@belitrophy.com`
- **Password**: `admin123`

### User (Daftar sendiri di halaman login)

---

## 🌊 Alur Aplikasi

### 1. User Flow (Pembeli)
```
Homepage (/) 
  → Lihat Katalog (/produk) 
  → Detail Produk (/produk/[id])
  → Register/Login (/login)
  → Info Lebih Lanjut (/more-info)
```

### 2. Admin Flow (Pengelola)
```
Login Admin (/login dengan email admin) 
  → Admin Dashboard (/admin/dashboard)
  → Kelola Produk:
     - Lihat semua produk
     - Tambah produk baru
     - Edit produk
     - Hapus produk
  → Lihat jumlah total user (read-only)
  → Logout
```

### 3. Authentication Flow
```
User/Admin → Masukkan email & password 
  → API /api/auth/login 
  → Validasi dengan Supabase 
  → Jika email = admin@belitrophy.com → Redirect ke /admin/dashboard
  → Jika email lain → Redirect ke homepage (/)
  → Set localStorage (isAdminLoggedIn, userRole, userToken)
```

### 4. Product Management Flow (Admin Only)
```
Admin Dashboard → Klik "Tambah Produk"
  → Form modal (Nama, Kategori, Harga, Deskripsi, URL Gambar)
  → Submit → Insert ke Supabase table products
  → Reload produk list

Admin Dashboard → Klik "Edit" pada produk
  → Form modal terisi data existing
  → Update → Update Supabase table products

Admin Dashboard → Klik "Hapus" pada produk
  → Konfirmasi → Delete dari Supabase table products
```

---

## 🎨 Fitur Utama

### ✅ Untuk User
- [x] Homepage dengan hero section
- [x] Katalog produk dengan filtering
- [x] Detail produk
- [x] Register & Login system
- [x] Responsive design
- [x] Navbar dinamis

### ✅ Untuk Admin
- [x] Dashboard khusus admin
- [x] CRUD Produk (Create, Read, Update, Delete)
- [x] Stats cards (Total Produk, Total User, Kategori)
- [x] Form modal untuk tambah/edit produk
- [x] Preview gambar produk
- [x] Validasi admin authentication
- [x] Logout functionality

---

## 🔧 Command Terminal Penting

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build untuk production
npm run build

# Run production server
npm start

# Lint code
npm run lint

# Prisma commands
npx prisma generate         # Generate Prisma Client
npx prisma db pull          # Pull schema dari database
npx prisma studio           # Open Prisma Studio (database GUI)

# Git commands
git status                  # Cek status perubahan
git add .                   # Stage semua perubahan
git commit -m "message"     # Commit perubahan
git push origin master      # Push ke GitHub
```

---

## 🚀 Deploy ke Production

### Deploy ke Vercel (Recommended)

1. Push code ke GitHub
2. Login ke [Vercel](https://vercel.com)
3. Import repository
4. Add Environment Variables (.env.local)
5. Deploy

### Deploy ke Netlify

1. Build project: `npm run build`
2. Upload folder `.next` ke Netlify
3. Add Environment Variables

---

## 🐛 Troubleshooting

### Error: Cannot find module 'next'
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Database connection failed
- Cek `.env.local` sudah benar
- Pastikan Supabase project masih aktif
- Cek koneksi internet

### Error: Page not found /admin/users
- Ini normal, halaman users sudah di-disable
- Otomatis redirect ke /admin/dashboard

### Image tidak muncul
- Cek URL gambar valid
- Sudah ditambahkan domain ke `next.config.ts` di `remotePatterns`

---

## 📞 Support

Jika ada pertanyaan atau error:
1. Cek dokumentasi ini
2. Buka [Issues di GitHub](https://github.com/VOLTXDHARMA/beli-throphy-web/issues)
3. Contact: VOLTXDHARMA

---

## 📄 License

MIT License - Bebas digunakan untuk project pribadi atau komersial

---

## 🙏 Credits

Dibuat dengan ❤️ menggunakan:
- Next.js
- Supabase
- Tailwind CSS
- Lucide Icons

**Happy Coding! 🚀**
