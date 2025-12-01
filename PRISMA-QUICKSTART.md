# ⚡ QUICK START - Prisma Setup

## 🎯 Yang Harus Anda Lakukan:

### **1. Update `.env` dengan Password Database** 🔑

```bash
# Buka file .env di root project
# Ganti GANTI_PASSWORD_ANDA dengan password database Supabase Anda
```

**Cara dapat password:**
1. Buka https://supabase.com/dashboard
2. Pilih project Anda
3. Settings → Database → Connection string
4. Copy password atau reset jika lupa

---

### **2. Pull Schema dari Database** 📥

```bash
npx prisma db pull
```

Expected output:
```
✔ Introspected 2 models and wrote them into prisma/schema.prisma
```

---

### **3. Generate Prisma Client** 🔨

```bash
npx prisma generate
```

Expected output:
```
✔ Generated Prisma Client to ./node_modules/@prisma/client
```

---

### **4. (Optional) Buka Prisma Studio** 🎨

```bash
npx prisma studio
```

Opens GUI at http://localhost:5555 untuk lihat & edit data.

---

## ✅ Done! Sekarang Anda bisa pakai Prisma:

```typescript
import { prisma } from '@/lib/prisma';

// Get all users
const users = await prisma.user.findMany();

// Create user
const newUser = await prisma.user.create({
  data: { name: 'John', email: 'john@example.com', password: '123' }
});
```

---

**📖 Panduan lengkap:** Baca file `SETUP-PRISMA.md`
