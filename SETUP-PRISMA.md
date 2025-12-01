# 🔧 SETUP PRISMA ORM - PANDUAN LENGKAP

## 📋 Yang Sudah Dilakukan di VS Code:

✅ Install Prisma dan Prisma Client  
✅ Inisialisasi Prisma (`npx prisma init`)  
✅ Buat schema untuk User dan Product  
✅ Buat Prisma Client singleton di `lib/prisma.ts`  
✅ Update `.env` dengan template connection string  

---

## 🚀 LANGKAH-LANGKAH YANG HARUS ANDA LAKUKAN:

### **STEP 1: Dapatkan Database Password dari Supabase** 🔑

1. **Buka Dashboard Supabase:**
   - Go to: https://supabase.com/dashboard
   - Login dengan akun Anda
   - Pilih project: **yvhoggnkmrfnxhjxqdkc**

2. **Get Database Password:**
   - Klik **Settings** (⚙️ di sidebar kiri bawah)
   - Klik **Database**
   - Scroll ke bagian **Connection string**
   - Pilih tab **URI** atau **Connection pooling**
   - Copy password Anda (atau reset jika lupa)

   **PENTING:** Password ini adalah password **database Postgres**, bukan password Supabase Dashboard!

3. **Update file `.env`:**
   - Buka file `.env` di root project
   - Ganti `GANTI_PASSWORD_ANDA` dengan password database Anda
   
   Contoh:
   ```env
   DATABASE_URL="postgresql://postgres.yvhoggnkmrfnxhjxqdkc:MyCoolPass123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
   
   DIRECT_URL="postgresql://postgres.yvhoggnkmrfnxhjxqdkc:MyCoolPass123@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
   ```

---

### **STEP 2: Pull Schema dari Database** 📥

Jalankan command ini di terminal VS Code:

```bash
npx prisma db pull
```

**Apa yang terjadi:**
- Prisma akan connect ke Supabase
- Membaca struktur tabel yang sudah ada (users, products)
- Update file `schema.prisma` sesuai database

**Output yang diharapkan:**
```
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "postgres"

Introspecting based on datasource defined in prisma/schema.prisma
✔ Introspected 2 models and wrote them into prisma/schema.prisma in 1.2s
```

---

### **STEP 3: Generate Prisma Client** 🔨

Jalankan command ini:

```bash
npx prisma generate
```

**Apa yang terjadi:**
- Generate TypeScript types dan client
- Buat folder `node_modules/@prisma/client`
- Siap dipakai di code

**Output yang diharapkan:**
```
✔ Generated Prisma Client (v5.x.x) to ./node_modules/@prisma/client
```

---

### **STEP 4: Test Koneksi** ✅

Buat file test di root project atau jalankan di terminal:

```typescript
// test-prisma.ts
import { prisma } from './lib/prisma';

async function main() {
  // Test: Count users
  const userCount = await prisma.user.count();
  console.log('Total users:', userCount);

  // Test: Get all products
  const products = await prisma.product.findMany();
  console.log('Products:', products.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Jalankan:
```bash
npx tsx test-prisma.ts
```

---

## 📁 Struktur File Prisma:

```
beli-throphy/
├── prisma/
│   └── schema.prisma       # ✅ Schema database
├── lib/
│   └── prisma.ts           # ✅ Prisma client singleton
├── .env                     # ✅ Database credentials (JANGAN COMMIT!)
├── .env.example             # Template .env
└── node_modules/
    └── @prisma/client/     # ✅ Generated client (setelah generate)
```

---

## 🔧 Commands Prisma yang Sering Dipakai:

### **Development:**
```bash
# Pull schema dari database
npx prisma db pull

# Generate Prisma Client
npx prisma generate

# Buka Prisma Studio (GUI database)
npx prisma studio

# Format schema.prisma
npx prisma format

# Validate schema
npx prisma validate
```

### **Migrations (Jika butuh ubah schema):**
```bash
# Create migration
npx prisma migrate dev --name nama_migration

# Apply migration
npx prisma migrate deploy

# Reset database (HATI-HATI!)
npx prisma migrate reset
```

---

## 📝 Cara Pakai Prisma di Code:

### **Import Prisma Client:**
```typescript
import { prisma } from '@/lib/prisma';
```

### **CRUD Operations:**

#### **CREATE:**
```typescript
// Tambah user baru
const newUser = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password',
  }
});
```

#### **READ:**
```typescript
// Get all users
const users = await prisma.user.findMany();

// Get by ID
const user = await prisma.user.findUnique({
  where: { id: 1 }
});

// Get by email
const user = await prisma.user.findUnique({
  where: { email: 'john@example.com' }
});

// Search dengan filter
const users = await prisma.user.findMany({
  where: {
    name: {
      contains: 'John',
      mode: 'insensitive' // case-insensitive
    }
  }
});
```

#### **UPDATE:**
```typescript
// Update user
const updated = await prisma.user.update({
  where: { id: 1 },
  data: {
    name: 'Jane Doe',
    phone: '08123456789'
  }
});
```

#### **DELETE:**
```typescript
// Delete user
const deleted = await prisma.user.delete({
  where: { id: 1 }
});
```

---

## 🔄 Migrasi dari Supabase Client ke Prisma:

### **SEBELUM (Supabase):**
```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', email);
```

### **SESUDAH (Prisma):**
```typescript
import { prisma } from '@/lib/prisma';

const user = await prisma.user.findUnique({
  where: { email }
});
```

---

## ⚡ Keuntungan Pakai Prisma:

✅ **Type-safe:** Auto-complete & error checking  
✅ **Intuitive API:** Lebih mudah dibaca  
✅ **Relational:** Join table otomatis  
✅ **Migrations:** Version control untuk database  
✅ **Prisma Studio:** GUI untuk lihat data  
✅ **Performance:** Query optimization otomatis  

---

## 🚨 TROUBLESHOOTING:

### **Error: "Can't reach database server"**
```
✗ Cek DATABASE_URL di .env sudah benar
✗ Cek password database Supabase
✗ Cek network/firewall
```

### **Error: "Environment variable not found: DATABASE_URL"**
```
✗ Pastikan file .env ada di root project
✗ Restart VS Code / terminal
```

### **Error: "prisma generate" failed**
```bash
# Delete node_modules dan install ulang
rm -rf node_modules
npm install
npx prisma generate
```

### **Error: "Type 'bigint' is not assignable"**
```typescript
// Gunakan Number() untuk convert BigInt
const userId = Number(user.id);
```

---

## 🔐 KEAMANAN:

⚠️ **JANGAN COMMIT `.env`!**

Tambahkan ke `.gitignore`:
```
.env
.env.local
```

Buat `.env.example` sebagai template:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"
```

---

## 📚 Resources:

- Prisma Docs: https://www.prisma.io/docs
- Supabase + Prisma: https://supabase.com/docs/guides/integrations/prisma
- Prisma Schema Reference: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference
- Prisma Client API: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference

---

## ✅ CHECKLIST:

Setelah semua langkah di atas, pastikan:

- [ ] File `.env` sudah diupdate dengan password database yang benar
- [ ] `npx prisma db pull` berhasil (dapat 2 models: User, Product)
- [ ] `npx prisma generate` berhasil (folder `@prisma/client` ada)
- [ ] Test koneksi berhasil (count users/products)
- [ ] `.env` ada di `.gitignore`
- [ ] Buat `.env.example` untuk dokumentasi

**Setelah ini, Anda siap pakai Prisma di project!** 🚀
