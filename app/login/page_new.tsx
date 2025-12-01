'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const userId = localStorage.getItem('userId');
    if (userId) {
      router.push('/');
      return;
    }

    // Auto-fill saved credentials
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const savedName = localStorage.getItem('savedName');
    
    if (savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        password: savedPassword || '',
        name: savedName || ''
      }));
      setRememberMe(true);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        // === LOGIN ===
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Save session
          localStorage.setItem('userId', String(data.user.id));
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          
          // Save credentials if remember me
          if (rememberMe) {
            localStorage.setItem('savedEmail', formData.email);
            localStorage.setItem('savedPassword', formData.password);
          } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('savedPassword');
          }
          
          setSuccess('Login berhasil! Mengalihkan...');
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          setError(data.error || 'Email atau password salah');
        }
      } else {
        // === REGISTER ===
        if (formData.password !== formData.confirmPassword) {
          setError('Password tidak cocok');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('Password minimal 6 karakter');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Auto-login after registration
          localStorage.setItem('userId', String(data.user.id));
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          
          // Save credentials
          if (rememberMe) {
            localStorage.setItem('savedEmail', formData.email);
            localStorage.setItem('savedPassword', formData.password);
            localStorage.setItem('savedName', formData.name);
          }
          
          setSuccess('Registrasi berhasil! Selamat datang!');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          setError(data.error || 'Registrasi gagal');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Selamat Datang!' : 'Daftar Akun Baru'}
              </h1>
              <p className="text-orange-100">
                {isLogin ? 'Masuk ke akun Beli Trophy Anda' : 'Bergabung dengan Beli Trophy sekarang'}
              </p>
            </div>

            {/* Form */}
            <div className="px-8 py-8">
              {/* Alert Messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700 font-medium">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input - Register Only */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none text-black font-medium placeholder:text-gray-400"
                        placeholder="Nama lengkap Anda"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none text-black font-medium placeholder:text-gray-400"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none text-black font-medium placeholder:text-gray-400"
                      placeholder="Minimal 6 karakter"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password - Register Only */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none text-black font-medium placeholder:text-gray-400"
                        placeholder="Ketik ulang password"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {/* Remember Me - Login Only */}
                {isLogin && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm font-medium text-gray-700">
                      Ingat saya di perangkat ini
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Memproses...
                    </span>
                  ) : (
                    isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'
                  )}
                </button>
              </form>

              {/* Toggle Login/Register */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{' '}
                  <button
                    onClick={toggleMode}
                    className="text-orange-600 hover:text-orange-700 font-bold hover:underline"
                  >
                    {isLogin ? 'Daftar' : 'Masuk'}
                  </button>
                </p>
              </div>

              {/* Back to Home */}
              <div className="mt-6 text-center">
                <a href="/" className="text-sm text-gray-500 hover:text-orange-600 font-medium transition">
                  ← Kembali ke Beranda
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
