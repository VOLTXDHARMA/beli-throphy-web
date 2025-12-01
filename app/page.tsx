'use client';

import { useState, useEffect, useRef } from 'react';
import { Trophy, Award, ShieldCheck, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';

// Temporary mock data - nanti diganti dengan data dari Supabase
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

export default function HomePage() {
  const [products, setProducts] = useState(mockProducts);
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Load products from localStorage (updated by admin)
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Save default products
      localStorage.setItem('products', JSON.stringify(mockProducts));
    }

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
    const whyUsCards = whyUsRef.current?.querySelectorAll('.scroll-animate');
    const productCards = productsRef.current?.querySelectorAll('.scroll-animate');
    const ctaElements = ctaRef.current?.querySelectorAll('.scroll-animate');

    stats?.forEach((el) => observer.observe(el));
    whyUsCards?.forEach((el) => observer.observe(el));
    productCards?.forEach((el) => observer.observe(el));
    ctaElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 text-white py-16 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl animate-pulse delay-75"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4 animate-bounce">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              Selamat Datang di<br />
              <span className="text-orange-200">Beli Trophy</span>
            </h2>
            
            <p className="text-lg md:text-xl mb-3 text-orange-50 font-semibold">
              Spesialis Trophy & Piala Berkualitas Premium
            </p>
            
            <p className="text-sm md:text-base mb-6 text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Kami menyediakan berbagai pilihan trophy, piala, medali, dan plakat untuk setiap momen pencapaian Anda. 
              Kualitas terbaik dengan harga terjangkau.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a 
                href="/produk"
                className="group inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-bold hover:bg-orange-50 transition shadow-xl transform hover:scale-105"
              >
                Lihat Katalog Produk
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
              
              <a 
                href="/more-info"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition border border-white/30"
              >
                Tentang Kami
              </a>
            </div>
          </div>
          
          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="scroll-animate bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover:bg-white/20 transition" style={{ transitionDelay: '0.1s' }}>
              <p className="text-2xl font-bold mb-1">1000+</p>
              <p className="text-xs text-orange-100">Pelanggan Puas</p>
            </div>
            <div className="scroll-animate bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover:bg-white/20 transition" style={{ transitionDelay: '0.2s' }}>
              <p className="text-2xl font-bold mb-1">50+</p>
              <p className="text-xs text-orange-100">Jenis Produk</p>
            </div>
            <div className="scroll-animate bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover:bg-white/20 transition" style={{ transitionDelay: '0.3s' }}>
              <p className="text-2xl font-bold mb-1">5 Tahun</p>
              <p className="text-xs text-orange-100">Pengalaman</p>
            </div>
            <div className="scroll-animate bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover:bg-white/20 transition" style={{ transitionDelay: '0.4s' }}>
              <p className="text-2xl font-bold mb-1">4.9</p>
              <p className="text-xs text-orange-100">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyUsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-animate">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Mengapa Memilih Kami?</h3>
            <p className="text-xl text-gray-600">Kepercayaan pelanggan adalah prioritas kami</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="scroll-animate group bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-orange-200" style={{ transitionDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">Kualitas Premium</h4>
              <p className="text-gray-600 leading-relaxed">
                Bahan berkualitas tinggi dengan finishing sempurna. Setiap produk dikerjakan dengan detail dan presisi tinggi.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-orange-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Garansi Kualitas</span>
              </div>
            </div>

            <div className="scroll-animate group bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-orange-200" style={{ transitionDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">Custom Design</h4>
              <p className="text-gray-600 leading-relaxed">
                Layanan kustomisasi lengkap dengan grafir nama, logo, atau text sesuai kebutuhan event Anda.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-orange-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Desain Fleksibel</span>
              </div>
            </div>

            <div className="scroll-animate group bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-orange-200" style={{ transitionDelay: '0.3s' }}>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">Harga Terjangkau</h4>
              <p className="text-gray-600 leading-relaxed">
                Harga kompetitif dengan kualitas terjamin. Tersedia berbagai pilihan sesuai budget Anda.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-orange-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Best Price Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={productsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center mb-12 scroll-animate">
          <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            PRODUK TERPOPULER
          </div>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            Koleksi Unggulan Kami
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilihan terbaik yang paling banyak dipilih pelanggan kami untuk berbagai event dan penghargaan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.slice(0, 6).map((product, index) => (
            <div key={product.id} className="scroll-animate" style={{ transitionDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center scroll-animate" style={{ transitionDelay: '0.6s' }}>
          <a 
            href="/produk"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-orange-700 hover:to-orange-600 transition shadow-xl transform hover:scale-105"
          >
            Lihat Semua Produk
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-gray-500 mt-4">50+ produk pilihan tersedia</p>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="scroll-animate bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 inline-block mb-6 border border-white/20">
            <span className="text-sm font-semibold">💬 Hubungi Kami</span>
          </div>
          
          <h3 className="scroll-animate text-3xl md:text-5xl font-bold mb-4 leading-tight" style={{ transitionDelay: '0.1s' }}>
            Siap Memesan Trophy<br />Impian Anda?
          </h3>
          
          <p className="scroll-animate text-lg md:text-xl mb-10 text-orange-50 max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.2s' }}>
            Hubungi kami sekarang via WhatsApp untuk konsultasi gratis, custom design, dan dapatkan penawaran terbaik!
          </p>
          
          <div className="scroll-animate" style={{ transitionDelay: '0.3s' }}>
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
            
            <p className="text-orange-100 text-sm mt-6 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Respon cepat & konsultasi gratis
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-orange-100 text-sm mb-4">Atau lihat katalog lengkap kami</p>
            <a 
              href="/produk"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold transition border border-white/30"
            >
              Browse Produk
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">© 2025 Beli Trophy. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
