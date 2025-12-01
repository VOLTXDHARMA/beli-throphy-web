'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, ArrowLeft, Save, Camera, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
// Using internal API routes for profile operations

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    avatar: '',
    created_at: ''
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        router.push('/login');
        return;
      }
      const res = await fetch(`/api/users/${userId}`, { cache: 'no-store' });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Gagal memuat profil');
      }
      const json = await res.json();
      if (json?.user) setProfile(json.user);
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Gagal memuat profil');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/users/${profile.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Gagal memperbarui profil');
      if (json?.user) setProfile(json.user);
      setSuccess('Profil berhasil diperbarui!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Gagal memperbarui profil');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    if (passwords.new !== passwords.confirm) {
      setError('Password baru tidak cocok');
      setSaving(false);
      return;
    }

    if (passwords.new.length < 6) {
      setError('Password minimal 6 karakter');
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(`/api/users/${profile.id}/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Gagal mengubah password');
      setSuccess('Password berhasil diubah!');
      setPasswords({ current: '', new: '', confirm: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Gagal mengubah password');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    // Keep saved credentials for auto-fill
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const savedName = localStorage.getItem('savedName');
    
    // Clear session
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    
    // Restore saved credentials
    if (savedEmail) localStorage.setItem('savedEmail', savedEmail);
    if (savedPassword) localStorage.setItem('savedPassword', savedPassword);
    if (savedName) localStorage.setItem('savedName', savedName);
    
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Pengaturan Profil</h1>
            <p className="text-white/90">Kelola informasi akun Anda</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition">
                  <Camera className="w-5 h-5 text-orange-600" />
                </button>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-1">{profile.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{profile.email}</p>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Member sejak</p>
                <p className="text-sm font-semibold text-gray-700">
                  {new Date(profile.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Forms */}
          <div className="md:col-span-2 space-y-6">
            {/* Edit Profile Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-orange-600" />
                Informasi Profil
              </h2>

              <form onSubmit={handleProfileUpdate} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none text-black font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none text-black font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor HP (Opsional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none text-black font-medium"
                      placeholder="08123456789"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </form>
            </div>

            {/* Change Password Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-orange-600" />
                Ubah Password
              </h2>

              <form onSubmit={handlePasswordChange} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Lama
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full pl-11 pr-12 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none text-black font-medium"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Baru
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none text-black font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none text-black font-medium"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  {saving ? 'Mengubah...' : 'Ubah Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Beli Trophy. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
