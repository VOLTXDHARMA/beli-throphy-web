# Beli Trophy - Aplikasi E-Commerce Trophy & Piala

## 🎯 Fitur Aplikasi

### Untuk User (Public):
✅ Halaman produk tanpa login
✅ Search produk
✅ Tombol "Pesan via WhatsApp" di setiap produk
✅ Design modern & responsive

### Untuk Admin:
✅ Login admin dengan email & password
✅ Dashboard kelola produk
✅ CRUD produk (Create, Read, Update, Delete)
✅ Upload gambar produk
✅ Realtime update ke halaman user

---

## 🚀 Cara Menjalankan

1. **Jalankan development server:**
   ```bash
   cd beli-throphy
   npm run dev
   ```

2. **Buka di browser:**
   - User: http://localhost:3000
   - Admin: http://localhost:3000/admin/login

---

## ⚙️ Konfigurasi yang Perlu Diubah

### 1. Nomor WhatsApp Admin
**File:** `components/ProductCard.tsx`  
**Baris:** 24

```typescript
const phoneNumber = '6281234567890'; // GANTI dengan nomor WA Anda
```

**Format:** 62 + nomor tanpa 0 di depan  
**Contoh:** 
- 0812-3456-7890 → `6281234567890`
- 0857-1234-5678 → `6285712345678`

---

### 2. Login Admin
**File:** `app/admin/login/page.tsx`  
**Baris:** 18-19

```typescript
const ADMIN_EMAIL = 'admin@belitrophy.com';  // GANTI email admin
const ADMIN_PASSWORD = 'admin123';            // GANTI password admin
```

**Login default:**
- Email: `admin@belitrophy.com`
- Password: `admin123`

---

## 📱 Setup Auto Reply WhatsApp (Bot)

Untuk auto reply sebelum admin balas, gunakan salah satu service:

### Opsi 1: Fonnte (Rekomendasi - Mudah)
1. Daftar di: https://fonnte.com
2. Scan QR code untuk connect WhatsApp
3. Set auto reply di dashboard Fonnte
4. Template auto reply:

```
Halo! Terima kasih sudah menghubungi Beli Trophy 🏆

Pesanan Anda sedang kami proses. Admin kami akan segera merespons dalam waktu 5-10 menit.

Jam operasional:
Senin-Sabtu: 08.00 - 20.00 WIB

Terima kasih! 😊
```

### Opsi 2: Wablas
1. Daftar di: https://wablas.com
2. Setup device & auto reply
3. Harga mulai 200rb/bulan

---

## 🗄️ Database (Opsional - Untuk Production)

Saat ini data tersimpan di localStorage browser.  
Untuk production, gunakan Supabase:

### Setup Supabase (Gratis):
1. Daftar di: https://supabase.com
2. Buat project baru
3. Buat table `products`:
   ```sql
   CREATE TABLE products (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     price INTEGER NOT NULL,
     description TEXT,
     image TEXT,
     category TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```
4. Copy API keys dari Settings > API
5. Buat file `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

---

## 📝 Notes

- Data produk saat ini tersimpan di **localStorage** browser
- Produk yang ditambah admin akan langsung muncul di halaman user
- Untuk deploy production, ganti localStorage dengan Supabase
- WhatsApp auto reply perlu service terpisah (Fonnte/Wablas)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database (future):** Supabase
- **WhatsApp:** WhatsApp Business API

---

## 📞 Support

Jika ada pertanyaan atau kendala, hubungi developer! 😊
