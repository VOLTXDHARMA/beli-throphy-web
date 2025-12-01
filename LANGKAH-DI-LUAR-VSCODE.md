# 📋 LANGKAH-LANGKAH DI LUAR VS CODE

## 🔑 STEP 1: Dapatkan Database Password dari Supabase

### **A. Login ke Supabase Dashboard**

1. Buka browser
2. Go to: **https://supabase.com/dashboard**
3. Login dengan akun Anda
4. Pilih project: **yvhoggnkmrfnxhjxqdkc**

---

### **B. Dapatkan Database Password**

**Visual Guide:**

```
Dashboard
  └─ Settings (⚙️ icon di sidebar kiri bawah)
      └─ Database
          └─ Connection string
              └─ Tab: "Connection pooling" atau "URI"
                  └─ Copy atau Reset password
```

**Screenshot Lokasi:**
```
┌──────────────────────────────────────┐
│ ⚙️ Settings                          │
│   ├─ General                         │
│   ├─ 🔧 Database  ← KLIK INI         │
│   ├─ API                             │
│   └─ Auth                            │
└──────────────────────────────────────┘

Scroll ke bawah, cari:
┌──────────────────────────────────────┐
│ Connection string                    │
│ ┌──────────────────────────────────┐ │
│ │ ○ Session mode                   │ │
│ │ ● Transaction mode (recommended) │ │ ← PILIH INI
│ │ ○ Direct connection              │ │
│ └──────────────────────────────────┘ │
│                                      │
│ Host: aws-0-ap-southeast-1...        │
│ Database name: postgres              │
│ Port: 6543                           │
│ User: postgres.yvhoggnkmrfnxhjxqdkc  │
│ Password: ●●●●●●●●●● [Show/Reset]    │ ← COPY INI
└──────────────────────────────────────┘
```

**Jika Lupa Password:**
- Klik tombol **"Reset Database Password"**
- Supabase akan generate password baru
- **SIMPAN password ini!** (tidak bisa dilihat lagi)

---

### **C. Update File `.env` di Project**

1. Buka file `.env` di root project (D:\KULIAH\SEMESTER 5\TROPHY\beli-throphy\.env)

2. Ganti `GANTI_PASSWORD_ANDA` dengan password yang baru Anda copy

**SEBELUM:**
```env
DATABASE_URL="postgresql://postgres.yvhoggnkmrfnxhjxqdkc:GANTI_PASSWORD_ANDA@aws-0..."
DIRECT_URL="postgresql://postgres.yvhoggnkmrfnxhjxqdkc:GANTI_PASSWORD_ANDA@aws-0..."
```

**SESUDAH (contoh):**
```env
DATABASE_URL="postgresql://postgres.yvhoggnkmrfnxhjxqdkc:MyCoolP@ssw0rd@aws-0..."
DIRECT_URL="postgresql://postgres.yvhoggnkmrfnxhjxqdkc:MyCoolP@ssw0rd@aws-0..."
```

3. **Save file** (Ctrl+S)

---

## 🔄 STEP 2: Pull Schema dari Database

### **Di Terminal VS Code:**

```bash
npx prisma db pull
```

**Apa yang terjadi:**
1. Prisma connect ke Supabase menggunakan DATABASE_URL
2. Membaca struktur tabel yang sudah ada (users, products)
3. Generate model di file `prisma/schema.prisma`

**Expected Output (SUCCESS):**
```
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "postgres", schema "public"

Introspecting based on datasource defined in prisma/schema.prisma …

✔ Introspected 2 models and wrote them into prisma/schema.prisma in 1.23s
      
Run prisma generate to generate Prisma Client.
```

**Jika Error:**
```
Error: P1001: Can't reach database server
```
→ **Solusi:** Cek password di `.env` sudah benar

---

## 🔨 STEP 3: Generate Prisma Client

### **Di Terminal VS Code:**

```bash
npx prisma generate
```

**Apa yang terjadi:**
1. Generate TypeScript types dari schema
2. Buat Prisma Client di `node_modules/@prisma/client`
3. Auto-complete siap dipakai!

**Expected Output (SUCCESS):**
```
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma

✔ Generated Prisma Client (v5.22.0) to .\node_modules\@prisma\client in 234ms

Start by importing your Prisma Client:

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

---

## 🎨 STEP 4 (Optional): Buka Prisma Studio

### **Di Terminal VS Code:**

```bash
npx prisma studio
```

**Apa yang terjadi:**
1. Buka GUI database di browser
2. URL: http://localhost:5555
3. Bisa lihat, edit, tambah, hapus data

**Tampilan Prisma Studio:**
```
┌─────────────────────────────────────┐
│ Prisma Studio                       │
├─────────────────────────────────────┤
│ 📁 Models                           │
│   ├─ User (1 record)                │
│   └─ Product (3 records)            │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ id │ name  │ email  │ created   │ │
│ │ 1  │ Test  │ test@  │ 2024-12-01│ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Untuk tutup:** Tekan Ctrl+C di terminal

---

## ✅ CHECKLIST - Pastikan Semua Beres:

- [ ] ✅ Password database sudah di-copy dari Supabase
- [ ] ✅ File `.env` sudah diupdate (2 tempat: DATABASE_URL & DIRECT_URL)
- [ ] ✅ `npx prisma db pull` berhasil (dapat message "Introspected 2 models")
- [ ] ✅ `npx prisma generate` berhasil (dapat message "Generated Prisma Client")
- [ ] ✅ (Optional) Prisma Studio bisa dibuka di http://localhost:5555

---

## 🚨 TROUBLESHOOTING:

### **Problem 1: "Can't reach database server"**

**Penyebab:**
- Password salah di `.env`
- Network/firewall block koneksi

**Solusi:**
1. Double-check password di Supabase Dashboard
2. Copy ulang dengan hati-hati (no extra spaces!)
3. Update `.env` dan save
4. Coba lagi: `npx prisma db pull`

---

### **Problem 2: "Environment variable not found: DATABASE_URL"**

**Penyebab:**
- File `.env` tidak ada di root project
- VS Code belum reload environment

**Solusi:**
1. Pastikan file `.env` ada di: `D:\KULIAH\SEMESTER 5\TROPHY\beli-throphy\.env`
2. Restart terminal di VS Code (Ctrl+C, tutup terminal, buka lagi)
3. Coba lagi command

---

### **Problem 3: "Prisma Client did not initialize yet"**

**Solusi:**
```bash
npx prisma generate
```

---

### **Problem 4: Password ada karakter special (@, #, dll)**

**Solusi:** URL encode password:

```
@ → %40
# → %23
$ → %24
% → %25
& → %26
```

Contoh:
```
Password: MyP@ss#123
Encoded:  MyP%40ss%23123
```

Update di `.env`:
```env
DATABASE_URL="postgresql://...username:MyP%40ss%23123@host..."
```

---

## 🎯 SETELAH SETUP SELESAI:

Anda sudah bisa pakai Prisma di code:

```typescript
// Di API routes atau server components
import { prisma } from '@/lib/prisma';

// Get all users
const users = await prisma.user.findMany();

// Create user
const newUser = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password'
  }
});

// Update user
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane Doe' }
});

// Delete user
const deleted = await prisma.user.delete({
  where: { id: 1 }
});
```

---

## 📚 Next Steps:

1. ✅ Setup Prisma selesai
2. 📖 Baca `SETUP-PRISMA.md` untuk panduan lengkap
3. 🔄 (Optional) Migrate API routes dari Supabase client ke Prisma
4. 🚀 Deploy project

**Selamat! Prisma sudah siap dipakai!** 🎉
