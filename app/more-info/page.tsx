'use client';

import { Trophy, Phone, Mail, MapPin, Clock, Award, Shield, Zap, MessageCircle, CheckCircle, Star, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function MoreInfoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Modern & Clean */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              <Trophy className="w-4 h-4" />
              Tentang Kami
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Penyedia Trophy & Piala<br />
              <span className="text-yellow-300">Berkualitas Premium</span>
            </h1>
            
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Dipercaya oleh ribuan pelanggan di seluruh Indonesia untuk menghadirkan penghargaan terbaik
            </p>

            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">2,500+</div>
                <div className="text-sm text-white/80">Pelanggan Puas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">5+</div>
                <div className="text-sm text-white/80">Tahun Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">4.9/5</div>
                <div className="text-sm text-white/80">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">150+</div>
                <div className="text-sm text-white/80">Produk</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Clean Card */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Trophy className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Beli Trophy</h2>
                <p className="text-orange-600 font-medium">Sejak 2020 - Terpercaya & Profesional</p>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <span className="font-semibold text-gray-900">Beli Trophy</span> adalah penyedia trophy, piala, medali, dan plakat berkualitas premium dengan pengalaman lebih dari 5 tahun dalam industri penghargaan. Kami telah dipercaya oleh ribuan instansi, perusahaan, sekolah, dan organisasi di seluruh Indonesia.
              </p>
              <p>
                Kami melayani berbagai kebutuhan mulai dari event olahraga, turnamen e-sports, kompetisi akademik, penghargaan karyawan, wisuda, hingga lomba seni & budaya dengan standar kualitas internasional.
              </p>
              <p>
                Dengan komitmen penuh terhadap <span className="font-semibold text-orange-600">excellence dan customer satisfaction</span>, kami menyediakan berbagai pilihan produk dengan harga kompetitif, layanan custom design profesional, dan garansi kepuasan 100%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Icon Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Mengapa Pilih Kami?</h2>
            <p className="text-gray-600">Keunggulan yang membuat kami berbeda</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition group">
              <div className="bg-orange-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Award className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kualitas Premium</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Material berkualitas tinggi dengan finishing sempurna dan coating anti-karat untuk ketahanan maksimal
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition group">
              <div className="bg-orange-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Zap className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Proses Cepat</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pengerjaan 1-7 hari kerja untuk custom order dan ready stock tersedia dengan pengiriman cepat
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition group">
              <div className="bg-orange-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Shield className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Garansi 100%</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Jaminan kepuasan dengan layanan after-sales terbaik dan garansi produk berkualitas
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition group">
              <div className="bg-orange-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Trophy className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Design</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Grafir laser precision dengan desain khusus sesuai kebutuhan, gratis konsultasi dan mockup
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition group">
              <div className="bg-orange-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <MessageCircle className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Layanan 24/7</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Customer service responsif dan profesional siap membantu via WhatsApp, email, atau telepon
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition group">
              <div className="bg-orange-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <CheckCircle className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Harga Terbaik</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Harga kompetitif dengan kualitas terjamin, diskon khusus untuk pembelian grosir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Testimoni Pelanggan</h2>
            <p className="text-gray-600">Apa kata mereka yang sudah mempercayai kami</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "Kualitas trophy sangat bagus! Finishing rapi dan pengerjaan cepat. Customer service juga sangat responsif. Recommended!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-orange-600">AR</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Ahmad Rizki</div>
                  <div className="text-sm text-gray-500">Panitia Turnamen Olahraga</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "Sudah beberapa kali order untuk acara kantor. Pelayanan profesional, harga bersaing, dan hasil selalu memuaskan!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-orange-600">SN</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Siti Nurhaliza</div>
                  <div className="text-sm text-gray-500">HRD Manager</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "Trophy untuk acara wisuda sekolah hasilnya mewah dan elegan. Harga juga sangat masuk akal. Pasti order lagi!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-orange-600">BS</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Budi Santoso</div>
                  <div className="text-sm text-gray-500">Kepala Sekolah</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Two Column */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Hubungi Kami</h2>
            <p className="text-gray-600">Siap melayani kebutuhan trophy dan piala Anda</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Telepon / WhatsApp</h3>
                <p className="text-orange-600 font-semibold mb-2">+62 812-3456-7890</p>
                <p className="text-sm text-gray-600">Fast response dalam 10 menit</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                <p className="text-orange-600 font-semibold mb-2">info@belitrophy.com</p>
                <p className="text-sm text-gray-600">Respon maksimal 24 jam</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Alamat Showroom</h3>
                <p className="text-gray-700 font-medium mb-1">Jl. Raya Trophy Mas No. 123</p>
                <p className="text-sm text-gray-600">Kebayoran Lama, Jakarta Selatan 12240</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Jam Operasional</h3>
                <p className="text-gray-700 font-medium mb-1">Senin - Sabtu</p>
                <p className="text-sm text-gray-600">08.00 - 20.00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Accordion Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Pertanyaan Umum (FAQ)</h2>
            <p className="text-gray-600">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
          </div>

          <div className="space-y-4">
            <details className="group bg-white rounded-xl shadow-md overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer p-5 hover:bg-gray-50 transition">
                <span className="font-semibold text-gray-900">Bagaimana cara memesan produk?</span>
                <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition" />
              </summary>
              <div className="px-5 pb-5 text-gray-700">
                Klik tombol "Pesan via WhatsApp" pada produk yang Anda inginkan. Anda akan diarahkan ke WhatsApp kami dengan template pesan otomatis. Admin kami akan segera memproses pesanan dalam waktu maksimal 10 menit.
              </div>
            </details>

            <details className="group bg-white rounded-xl shadow-md overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer p-5 hover:bg-gray-50 transition">
                <span className="font-semibold text-gray-900">Apakah bisa custom design?</span>
                <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition" />
              </summary>
              <div className="px-5 pb-5 text-gray-700">
                Ya, tentu saja! Kami menyediakan layanan custom design dengan grafir nama, logo, atau teks sesuai kebutuhan. Hubungi kami via WhatsApp untuk konsultasi gratis dan dapatkan mockup design sebelum produksi.
              </div>
            </details>

            <details className="group bg-white rounded-xl shadow-md overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer p-5 hover:bg-gray-50 transition">
                <span className="font-semibold text-gray-900">Berapa lama proses pembuatan?</span>
                <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition" />
              </summary>
              <div className="px-5 pb-5 text-gray-700">
                Ready Stock: 1-2 hari kerja • Custom Order: 3-7 hari kerja (tergantung kompleksitas) • Express: Tersedia untuk kebutuhan mendesak dengan biaya tambahan.
              </div>
            </details>

            <details className="group bg-white rounded-xl shadow-md overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer p-5 hover:bg-gray-50 transition">
                <span className="font-semibold text-gray-900">Apakah ada minimal order?</span>
                <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition" />
              </summary>
              <div className="px-5 pb-5 text-gray-700">
                Tidak ada minimal order! Anda bisa memesan mulai dari 1 unit. Untuk order dalam jumlah banyak (10+ unit), kami menyediakan harga khusus grosir dan diskon menarik.
              </div>
            </details>

            <details className="group bg-white rounded-xl shadow-md overflow-hidden">
              <summary className="flex justify-between items-center cursor-pointer p-5 hover:bg-gray-50 transition">
                <span className="font-semibold text-gray-900">Bagaimana dengan pengiriman?</span>
                <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition" />
              </summary>
              <div className="px-5 pb-5 text-gray-700">
                Kami melayani pengiriman ke seluruh Indonesia melalui JNE (Reguler & YES), J&T Express, SiCepat, atau ekspedisi pilihan Anda. Bonus: Gratis packing bubble wrap & kardus kokoh!
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Memesan Trophy Berkualitas?</h2>
          <p className="text-lg text-white/90 mb-8">Hubungi kami sekarang untuk konsultasi gratis dan penawaran terbaik!</p>
          <a 
            href="https://wa.me/6281234567890" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            Chat via WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Beli Trophy. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
