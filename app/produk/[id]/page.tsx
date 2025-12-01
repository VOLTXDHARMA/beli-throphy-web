'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Trophy, ArrowLeft, MessageCircle, Star, CheckCircle, Package } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      const foundProduct = products.find((p: Product) => p.id === Number(params.id));
      setProduct(foundProduct || null);
    }
    setLoading(false);
  }, [params.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    
    const phoneNumber = '6281234567890';
    const message = `Halo, saya tertarik dengan produk:\n\n` +
                   `📦 *${product.name}*\n` +
                   `💰 Harga: ${formatPrice(product.price)}\n` +
                   `📝 ${product.description}\n\n` +
                   `Apakah produk ini masih tersedia?`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4 animate-bounce" />
          <p className="text-gray-600">Memuat produk...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Trophy className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">Produk yang Anda cari tidak tersedia.</p>
          <button
            onClick={() => router.push('/produk')}
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 font-medium mb-6 transition group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
          Kembali
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {product.category}
                </div>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 p-4 rounded-xl border border-green-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-pointer relative">
                  <CheckCircle className="w-6 h-6 text-green-600 mb-2 group-hover:rotate-12 transition" />
                  <p className="text-sm font-semibold text-gray-800">Kualitas Premium</p>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Bahan berkualitas tinggi ✨
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-pointer relative">
                  <Star className="w-6 h-6 text-blue-600 mb-2 group-hover:rotate-12 transition" />
                  <p className="text-sm font-semibold text-gray-800">Rating 4.9/5</p>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Dipercaya 1000+ pelanggan ⭐
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-pointer relative">
                  <Package className="w-6 h-6 text-purple-600 mb-2 group-hover:rotate-12 transition" />
                  <p className="text-sm font-semibold text-gray-800">Packing Aman</p>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Bubble wrap + kardus tebal 📦
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-pointer relative">
                  <Trophy className="w-6 h-6 text-amber-600 mb-2 group-hover:rotate-12 transition" />
                  <p className="text-sm font-semibold text-gray-800">Garansi Kualitas</p>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Jaminan kepuasan 100% 🏆
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <span className="text-sm text-gray-600">(4.9/5 • 127 ulasan)</span>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200 mb-6">
                  <p className="text-sm text-gray-600 mb-1">Harga</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
                    Deskripsi Produk
                  </h2>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                    {product.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    Spesifikasi
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">Kategori</span>
                      <span className="text-sm font-semibold text-gray-800">{product.category}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">Material</span>
                      <span className="text-sm font-semibold text-gray-800">Premium Quality</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">Kondisi</span>
                      <span className="text-sm font-semibold text-gray-800">Baru</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-sm text-gray-600">Garansi</span>
                      <span className="text-sm font-semibold text-gray-800">✓ Ya</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <div className="sticky bottom-0 bg-white pt-4 border-t-2 border-gray-100">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  {/* Animated Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <MessageCircle className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
                  <span className="relative z-10">Pesan Sekarang via WhatsApp</span>
                  <span className="relative z-10 text-2xl group-hover:animate-bounce">💬</span>
                </button>
                <p className="text-xs text-center text-gray-500 mt-3 animate-pulse">
                  ⚡ Respon cepat dalam 10 menit • 📦 Packing aman & rapi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">© 2025 Beli Trophy. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
