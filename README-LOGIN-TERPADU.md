# 🔐 SISTEM LOGIN TERPADU - ADMIN & USER

## ✨ Fitur Baru

### 🎯 **1. Login Terpadu**
- **1 halaman login** untuk admin dan user di `/login`
- **Auto-routing berdasarkan role**:
  - Admin → `/admin/dashboard`
  - User → `/` (Homepage)
- **Tidak ada lagi** `/admin/login` (sudah dihapus)

### 👑 **2. Admin Features**

#### **Login Credentials:**
```
Email: admin@belitrophy.com
Password: admin123
```

#### **Admin Dashboard:**
- Statistik total produk, user, dan kategori
- CRUD produk lengkap (Create, Read, Update, Delete)
- Modal form untuk tambah/edit produk
- Preview gambar produk
- Grid view dengan kartu produk

#### **Manajemen User:**
- Lihat semua user terdaftar
- Statistik:
  - Total user terdaftar
  - Total email
  - User baru 7 hari terakhir
- **Search/Filter** user by nama, email, phone
- **Delete user** dengan konfirmasi modal
- Tabel dengan info lengkap (nama, email, tanggal daftar)

### 👤 **3. User Features**

#### **Login/Register:**
- Toggle antara login dan registrasi
- Remember me (simpan credentials)
- Show/hide password
- Auto-login setelah register
- Redirect ke homepage setelah login

#### **Profile Management:**
- Edit nama, email, phone
- Upload avatar
- Ganti password
- View/update profile info

## 📁 Struktur File

### **API Routes:**
```
app/api/
├── auth/
│   ├── login/route.ts       # Login terpadu (admin + user)
│   └── register/route.ts     # Register user baru
└── users/
    ├── route.ts              # GET all users, DELETE user
    └── [id]/
        ├── route.ts          # GET/PATCH user profile
        └── password/route.ts # POST change password
```

### **Pages:**
```
app/
├── login/page.tsx            # Login terpadu (admin + user)
├── profile/page.tsx          # User profile management
└── admin/
    ├── dashboard/page.tsx    # Admin dashboard (CRUD produk)
    └── users/page.tsx        # Manajemen user
```

### **Deleted Files:**
- ❌ `app/admin/login/page.tsx` (tidak diperlukan lagi)
- ❌ `components/LoginModal.tsx` (sudah diganti dengan halaman login)

## 🚀 Cara Menggunakan

### **1. Setup Database**
Buka `DATABASE-FULL.md` dan run SQL di Supabase SQL Editor.

### **2. Test Login Admin**
```
1. Buka http://localhost:3000
2. Klik "Login" di navbar
3. Masukkan:
   - Email: admin@belitrophy.com
   - Password: admin123
4. Otomatis masuk ke /admin/dashboard
```

### **3. Test Login User**
```
1. Buka http://localhost:3000/login
2. Klik "Daftar" untuk register atau login dengan:
   - Email: test@example.com
   - Password: 123456
3. Otomatis masuk ke homepage
4. Klik avatar → Pengaturan Profil
```

### **4. Test Admin Features**

#### **Manajemen Produk:**
```
1. Login sebagai admin
2. Di dashboard, klik "Tambah Produk"
3. Isi form (nama, kategori, harga, deskripsi, URL gambar)
4. Klik "Simpan Produk"
5. Edit: klik tombol "Edit" di kartu produk
6. Hapus: klik tombol "Hapus" (dengan konfirmasi)
```

#### **Manajemen User:**
```
1. Login sebagai admin
2. Klik card "Total User" atau navigate ke /admin/users
3. Lihat daftar user di tabel
4. Gunakan search bar untuk filter user
5. Hapus user: klik tombol "Hapus" → Konfirmasi
```

## 🔧 Technical Details

### **Login Flow:**

```javascript
// 1. User masukkan email & password di /login
// 2. POST ke /api/auth/login
// 3. API cek:
//    - Jika email = admin@belitrophy.com && password = admin123
//      → Return role: 'admin', redirectTo: '/admin/dashboard'
//    - Jika user ada di database
//      → Return role: 'user', redirectTo: '/'
// 4. Frontend simpan ke localStorage:
//    - userId, userToken, currentUser, userRole
//    - isAdminLoggedIn (jika admin)
// 5. Redirect sesuai redirectTo
```

### **Role-Based Access:**

```javascript
// Admin Dashboard & Users Page
useEffect(() => {
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'admin' || 
                  localStorage.getItem('isAdminLoggedIn') === 'true';
  
  if (!isAdmin) {
    router.push('/login'); // Redirect jika bukan admin
    return;
  }
}, []);
```

### **API User Management:**

```javascript
// GET /api/users - Ambil semua user (tanpa password)
// Response: { success: true, users: [...], total: 5 }

// DELETE /api/users?id=123 - Hapus user by ID
// Response: { success: true, message: 'User berhasil dihapus' }
```

## ✅ Testing Checklist

### **Login Terpadu:**
- [x] Admin login → masuk ke /admin/dashboard
- [x] User login → masuk ke homepage
- [x] Register → auto-login → masuk ke homepage
- [x] Remember me → auto-fill credentials

### **Admin Features:**
- [x] Dashboard statistik (total produk, user, kategori)
- [x] CRUD produk (Create, Read, Update, Delete)
- [x] Lihat semua user di /admin/users
- [x] Search/filter user
- [x] Delete user dengan konfirmasi
- [x] Logout admin → clear all localStorage

### **User Features:**
- [x] Login/register di halaman terpadu
- [x] Navbar update setelah login (tampil avatar)
- [x] Profile management (edit nama, email, phone)
- [x] Ganti password
- [x] Logout → kembali ke state awal

### **Protection:**
- [x] /admin/dashboard redirect ke /login jika bukan admin
- [x] /admin/users redirect ke /login jika bukan admin
- [x] /profile cek userId di localStorage

## 🎨 UI/UX Improvements

### **Admin Dashboard:**
- Modern gradient backgrounds
- Hover effects dan transitions
- Modal dengan backdrop blur
- Toast notifications (via alert)
- Responsive grid layout

### **Admin Users Page:**
- 3 stats cards dengan animasi
- Search bar dengan icon
- Tabel dengan zebra striping
- Delete modal dengan warning icon
- Scroll animations

### **Login Page:**
- Full-page gradient background
- Toggle login/register
- Show/hide password
- Remember me checkbox
- Success/error messages

## 🐛 Troubleshooting

### **Admin tidak bisa login:**
```
- Pastikan email persis: admin@belitrophy.com (lowercase)
- Password persis: admin123
- Cek Console logs: [LOGIN] Admin login successful
```

### **User list kosong di /admin/users:**
```
- Run SQL dari DATABASE-FULL.md di Supabase
- Register minimal 1 user dari /login
- Cek Console: [ADMIN USERS] Response: { success: true, users: [...] }
```

### **Delete user tidak berhasil:**
```
- Cek Supabase RLS policies: Allow anon delete users
- Cek Console: [ADMIN USERS] Deleting user: <id>
- Cek Network tab: DELETE /api/users?id=<id> → 200
```

## 📝 Environment

```env
NEXT_PUBLIC_SUPABASE_URL=https://yvhoggnkmrfnxhjxqdkc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔐 Security Notes

⚠️ **DEMO MODE**: RLS policies allow anon CRUD for demo purposes.

**Production Checklist:**
- [ ] Implement proper JWT authentication
- [ ] Use Supabase Auth instead of custom login
- [ ] Add rate limiting to API routes
- [ ] Hash passwords (currently plain text for demo)
- [ ] Add admin role check in middleware
- [ ] Enable stricter RLS policies
- [ ] Add CSRF protection
- [ ] Implement proper session management

## 🎯 Summary

✅ **Login terpadu** di 1 halaman `/login`  
✅ **Auto-routing** berdasarkan role (admin/user)  
✅ **Admin dashboard** dengan CRUD produk lengkap  
✅ **Manajemen user** dengan search & delete  
✅ **Profile management** untuk user  
✅ **Remember me** & auto-login  
✅ **No more** `/admin/login` atau `LoginModal`  
✅ **Semua fitur terkoneksi** dengan Supabase  

Sekarang admin dan user login di tempat yang sama, tapi masuk ke dashboard yang berbeda! 🚀
