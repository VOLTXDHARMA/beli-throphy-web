'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Plus, Edit, Trash2, LogOut, Package, Users, X, Save, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });

  useEffect(() => {
    setMounted(true);
    // Check if admin is logged in
    const userRole = localStorage.getItem('userRole');
    const isLoggedIn = userRole === 'admin' || localStorage.getItem('isAdminLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    loadProducts();
  }, [router]);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setProducts(data);
      } else {
        // Jika tidak ada data, insert default products
        const defaultProducts = [
          {
            name: 'Trophy Juara 1 Emas',
            price: 150000,
            description: 'Trophy emas untuk juara pertama, tinggi 40cm',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
            category: 'Trophy Emas'
          },
          {
            name: 'Trophy Juara 2 Silver',
            price: 120000,
            description: 'Trophy perak untuk juara kedua, tinggi 35cm',
            image: 'https://images.unsplash.com/photo-1599459182681-61cb03c56d72?w=400',
            category: 'Trophy Silver'
          },
          {
            name: 'Trophy Juara 3 Perunggu',
            price: 100000,
            description: 'Trophy perunggu untuk juara ketiga, tinggi 30cm',
            image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
            category: 'Trophy Perunggu'
          },
          {
            name: 'Piala Turnamen',
            price: 200000,
            description: 'Piala besar untuk turnamen, tinggi 50cm',
            image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=400',
            category: 'Piala'
          },
          {
            name: 'Medali Emas Custom',
            price: 50000,
            description: 'Medali emas dengan ukiran custom',
            image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400',
            category: 'Medali'
          },
          {
            name: 'Plakat Kayu Premium',
            price: 175000,
            description: 'Plakat kayu jati dengan grafir custom',
            image: 'https://images.unsplash.com/photo-1604537529586-c7f41cb34f51?w=400',
            category: 'Plakat'
          }
        ];

        const { data: insertedData, error: insertError } = await supabase
          .from('products')
          .insert(defaultProducts)
          .select();

        if (insertError) throw insertError;
        if (insertedData) setProducts(insertedData);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Gagal memuat produk dari database');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
      category: ''
    });
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      category: product.category
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
      category: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        category: formData.category
      };

      if (editingProduct) {
        // Update existing
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
      } else {
        // Add new
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
      }

      // Reload products
      await loadProducts();
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Gagal menyimpan produk');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // Reload products
        await loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Gagal menghapus produk');
      }
    }
  };

  const getTotalUsers = async () => {
    if (!mounted) return 0;
    try {
      const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error('Error getting users count:', error);
      return 0;
    }
  };

  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    if (mounted) {
      getTotalUsers().then(setUsersCount);
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-orange-500 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">Kelola produk trophy Anda</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-semibold shadow-md"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Produk</p>
                <p className="text-4xl font-bold text-orange-600">{products.length}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-xl">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition cursor-pointer"
               onClick={() => router.push('/admin/users')}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total User</p>
                <p className="text-4xl font-bold text-blue-600">{usersCount}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Kategori</p>
                <p className="text-4xl font-bold text-purple-600">
                  {[...new Set(products.map(p => p.category))].length}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Kelola Produk</h2>
            <p className="text-sm text-gray-500">Tambah, edit, atau hapus produk</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Tambah Produk
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-orange-600">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada produk</h3>
            <p className="text-gray-600 mb-6">Mulai tambahkan produk pertama Anda</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition"
            >
              <Plus className="w-5 h-5" />
              Tambah Produk
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                </h2>
                <p className="text-orange-100 text-sm mt-1">
                  {editingProduct ? 'Perbarui informasi produk' : 'Isi form untuk menambah produk'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nama Produk <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-gray-900"
                  placeholder="Contoh: Trophy Juara 1 Emas"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-gray-900"
                  placeholder="Contoh: Trophy Emas, Medali, Plakat"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Harga (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-gray-900"
                  placeholder="Contoh: 150000"
                  required
                  min="0"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none text-gray-900"
                  placeholder="Contoh: Trophy emas untuk juara pertama, tinggi 40cm"
                  rows={4}
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  URL Gambar <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-gray-900"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                {formData.image && (
                  <div className="mt-3 relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  {editingProduct ? 'Update Produk' : 'Simpan Produk'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-bold transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
