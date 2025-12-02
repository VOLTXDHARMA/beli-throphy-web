'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminUsersPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect ke dashboard - halaman ini tidak boleh diakses
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Redirecting...</h1>
        <p className="text-gray-600">Halaman ini tidak tersedia</p>
      </div>
    </div>
  );
}
