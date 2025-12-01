'use client';

import { useState, useEffect } from 'react';
import { Trophy, Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';

// Temporary mock data
const mockProducts = [
  {
    id: 1,
    name: 'Trophy Juara 1 Emas',
    price: 150000,
    description: 'Trophy emas untuk juara pertama, tinggi 40cm',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
    category: 'Trophy Emas'
  },
  {
    id: 2,
    name: 'Trophy Juara 2 Silver',
    price: 120000,
    description: 'Trophy perak untuk juara kedua, tinggi 35cm',
    image: 'https://images.unsplash.com/photo-1599459182681-61cb03c56d72?w=400',
    category: 'Trophy Silver'
  },
  {
    id: 3,
    name: 'Trophy Juara 3 Perunggu',
    price: 100000,
    description: 'Trophy perunggu untuk juara ketiga, tinggi 30cm',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
    category: 'Trophy Perunggu'
  },
  {
    id: 4,
    name: 'Piala Turnamen',
    price: 200000,
    description: 'Piala besar untuk turnamen, tinggi 50cm',
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=400',
    category: 'Piala'
  },
  {
    id: 5,
    name: 'Medali Emas Custom',
    price: 50000,
    description: 'Medali emas dengan ukiran custom',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400',
    category: 'Medali'
  },
  {
    id: 6,
    name: 'Plakat Kayu Premium',
    price: 175000,
    description: 'Plakat kayu jati dengan grafir custom',
    image: 'https://images.unsplash.com/photo-1604537529586-c7f41cb34f51?w=400',
    category: 'Plakat'
  }
];

export default function ProdukPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [priceRange, setPriceRange] = useState('Semua');
  const [sortBy, setSortBy] = useState('default');
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8; // Maksimal 8 produk per halaman

  useEffect(() => {
    // Load products from Supabase
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback to mock data if error
      setProducts(mockProducts);
    }
  };

  // Get unique categories
  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === '< 100rb') {
      matchesPrice = product.price < 100000;
    } else if (priceRange === '100rb - 150rb') {
      matchesPrice = product.price >= 100000 && product.price <= 150000;
    } else if (priceRange === '> 150rb') {
      matchesPrice = product.price > 150000;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const hasActiveFilter = selectedCategory !== 'Semua' || priceRange !== 'Semua' || sortBy !== 'default';

  const resetFilters = () => {
    setSelectedCategory('Semua');
    setPriceRange('Semua');
    setSortBy('default');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Katalog Produk</h1>
            <p className="text-white/90">Temukan trophy dan piala berkualitas untuk kebutuhan Anda</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari produk berdasarkan nama atau deskripsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-gray-700"
            />
          </div>

          {/* Filter Toggle & Actions */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter & Urutkan
              {hasActiveFilter && (
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Aktif
                </span>
              )}
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {sortedProducts.length} produk ditemukan
                {totalPages > 1 && (
                  <span className="text-gray-400"> • Halaman {currentPage} dari {totalPages}</span>
                )}
              </span>
              
              {hasActiveFilter && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  <X className="w-4 h-4" />
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-gray-700 font-medium"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Range Harga</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-gray-700 font-medium"
                >
                  <option value="Semua">Semua Harga</option>
                  <option value="< 100rb">Dibawah 100rb</option>
                  <option value="100rb - 150rb">100rb - 150rb</option>
                  <option value="> 150rb">Diatas 150rb</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Urutkan</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition text-gray-700 font-medium"
                >
                  <option value="default">Urutkan</option>
                  <option value="name">Nama (A-Z)</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Kembali
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && goToPage(page)}
                      disabled={page === '...'}
                      className={`min-w-[40px] h-[40px] rounded-lg font-semibold transition ${
                        page === currentPage
                          ? 'bg-orange-500 text-white shadow-md'
                          : page === '...'
                          ? 'bg-transparent text-gray-400 cursor-default'
                          : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h3>
            <p className="text-gray-600 mb-6">Coba ubah filter atau kata kunci pencarian Anda</p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* WhatsApp CTA Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-16 mt-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 inline-block mb-6 border border-white/20">
            <span className="text-sm font-semibold">💬 Hubungi Kami</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Ada Pertanyaan Tentang Produk?
          </h3>
          
          <p className="text-lg md:text-xl mb-8 text-orange-50 max-w-2xl mx-auto">
            Hubungi kami via WhatsApp untuk informasi produk, custom design, dan penawaran terbaik!
          </p>
          
          <a 
            href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20produk%20Beli%20Trophy"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white hover:bg-orange-50 text-orange-600 px-10 py-5 rounded-2xl font-bold text-lg transition shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105"
          >
            <div className="bg-orange-100 p-2 rounded-xl group-hover:scale-110 transition group-hover:bg-orange-200">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span>Chat WhatsApp Sekarang</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Beli Trophy. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
