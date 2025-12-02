'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Users, Calendar, Mail, Search, UserCheck } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  created_at?: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if admin is logged in
    const userRole = localStorage.getItem('userRole');
    const isAdmin = userRole === 'admin' || localStorage.getItem('isAdminLoggedIn') === 'true';
    
    if (!isAdmin) {
      router.push('/login');
      return;
    }

    loadUsers();

    // Scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const stats = statsRef.current?.querySelectorAll('.scroll-animate');
    const search = searchRef.current?.querySelectorAll('.scroll-animate');
    const table = tableRef.current?.querySelectorAll('.scroll-animate');

    stats?.forEach((el) => observer.observe(el));
    search?.forEach((el) => observer.observe(el));
    table?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [router]);

  const loadUsers = async () => {
    try {
      console.log('[ADMIN USERS] Loading users...');
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      console.log('[ADMIN USERS] Response:', data);
      console.log('[ADMIN USERS] Response status:', response.status);
      console.log('[ADMIN USERS] Users array:', data.users);

      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users);
        console.log('[ADMIN USERS] Users loaded:', data.users.length);
        console.log('[ADMIN USERS] First user sample:', data.users[0]);
      } else {
        console.error('[ADMIN USERS] Failed:', data.error);
        alert(`Gagal memuat user: ${data.error || 'Unknown error'}`);
        setUsers([]);
      }
    } catch (error: any) {
      console.error('[ADMIN USERS] Error loading users:', error);
      alert(`Terjadi kesalahan saat memuat data user: ${error.message}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    if (!user || !user.name || !user.email) {
      console.warn('[ADMIN USERS] Invalid user data:', user);
      return false;
    }
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      (user.phone && user.phone.includes(searchQuery))
    );
  });

  console.log('[ADMIN USERS] Filtered users count:', filteredUsers.length);
  console.log('[ADMIN USERS] Total users:', users.length);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  console.log('[ADMIN USERS] Rendering with users:', users.length);
  console.log('[ADMIN USERS] Filtered users for display:', filteredUsers.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="p-3 hover:bg-orange-100 rounded-xl transition transform hover:scale-110 shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-6 h-6 text-orange-600" />
              </button>
              <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-3 rounded-2xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Manajemen User
                </h1>
                <p className="text-sm text-gray-500 mt-1">Kelola dan pantau akun pengguna terdaftar</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <div>
                  <p className="text-xs font-semibold opacity-90 uppercase tracking-wide">Total User</p>
                  <p className="text-3xl font-bold">{users.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Cards */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="scroll-animate bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-8 border-t-4 border-orange-500" style={{ transitionDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-xl">
                <Users className="w-10 h-10 text-orange-600" />
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm font-medium mb-1">Total Terdaftar</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">{users.length}</p>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
          </div>

          <div className="scroll-animate bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-8 border-t-4 border-orange-400" style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-xl">
                <Mail className="w-10 h-10 text-orange-500" />
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm font-medium mb-1">Total Email</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  {users.filter(u => u.email).length}
                </p>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full"></div>
          </div>

          <div className="scroll-animate bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-8 border-t-4 border-orange-300" style={{ transitionDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-xl">
                <Calendar className="w-10 h-10 text-orange-400" />
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm font-medium mb-1">User Baru (7 Hari)</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  {users.filter(u => {
                    if (!u.created_at) return false;
                    const created = new Date(u.created_at);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return created >= weekAgo;
                  }).length}
                </p>
              </div>
            </div>
            <div className="h-2 bg-gradient-to-r from-orange-300 to-orange-200 rounded-full"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div ref={searchRef} className="scroll-animate bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100" style={{ transitionDelay: '0.4s' }}>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-orange-400 w-6 h-6" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama, email, atau nomor HP..."
              className="w-full pl-14 pr-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none transition text-gray-900 font-medium placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Users Table */}
        <div ref={tableRef} className="scroll-animate bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100" style={{ transitionDelay: '0.5s' }}>
          {users.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-12 h-12 text-orange-600" />
              </div>
              <p className="text-gray-600 text-xl font-semibold mb-2">
                Belum ada user terdaftar
              </p>
              <p className="text-gray-400 mb-4">
                User akan muncul di sini setelah registrasi
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto mt-6">
                <p className="text-blue-900 font-semibold mb-3">💡 Belum ada data user?</p>
                <div className="text-left text-sm text-blue-800 space-y-2">
                  <p><strong>Kemungkinan:</strong></p>
                  <ol className="list-decimal ml-5 space-y-1">
                    <li>Database belum disetup - Buka <code className="bg-blue-100 px-2 py-1 rounded">DATABASE-FULL.md</code> dan jalankan SQL di Supabase</li>
                    <li>Belum ada user yang register - Coba register user baru di <code className="bg-blue-100 px-2 py-1 rounded">/login</code></li>
                    <li>RLS policies belum dikonfigurasi - Cek di Supabase Dashboard</li>
                  </ol>
                  <p className="mt-3"><strong>Cek Console (F12)</strong> untuk error details.</p>
                </div>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-12 h-12 text-orange-600" />
              </div>
              <p className="text-gray-600 text-xl font-semibold mb-2">
                Tidak ada user yang cocok dengan pencarian
              </p>
              <p className="text-gray-400">
                Coba kata kunci lain atau hapus filter pencarian
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
                  <tr>
                    <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wide">No</th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5" />
                        Nama
                      </div>
                    </th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Email
                      </div>
                    </th>
                    <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Terdaftar
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.length > 0 ? filteredUsers.map((user, index) => {
                    console.log('[ADMIN USERS] Rendering user:', index, user);
                    return (
                    <tr key={user.id} className={`hover:bg-orange-50/50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-8 py-6 text-sm font-bold text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-orange-200">
                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-base">{user.name || 'Unknown'}</p>
                            <p className="text-xs text-orange-600 capitalize font-medium bg-orange-100 px-3 py-1 rounded-full inline-block mt-1">
                              User
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-700 font-medium">
                        {user.email || 'No email'}
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-600 font-medium">
                        {formatDate(user.created_at)}
                      </td>
                    </tr>
                  );
                  }) : (
                    <tr>
                      <td colSpan={4} className="px-8 py-6 text-center text-gray-500">
                        Debug: filteredUsers.length = {filteredUsers.length}, users.length = {users.length}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
