import React from 'react';
import { SectionType, BeritaItem, PotensiItem, StatistikDesa } from '../types';
import { 
  ShieldAlert, 
  ArrowRight, 
  Users, 
  Map, 
  TreePine, 
  Wallet, 
  MessageSquare, 
  Search, 
  FileCheck, 
  Sparkles,
  ChevronRight,
  Calendar,
  Eye,
  Building2,
  PhoneCall
} from 'lucide-react';
import { motion } from 'motion/react';

interface BerandaSectionProps {
  onNavigate: (section: SectionType) => void;
  onCheckTicketModal: () => void;
  beritaList: BeritaItem[];
  potensiList: PotensiItem[];
  statistik: StatistikDesa;
}

export const BerandaSection: React.FC<BerandaSectionProps> = ({
  onNavigate,
  onCheckTicketModal,
  beritaList,
  potensiList,
  statistik,
}) => {
  const latestBerita = beritaList.slice(0, 3);
  const featuredPotensi = potensiList.filter(p => p.unggulan).slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative bg-emerald-950 text-white overflow-hidden rounded-3xl shadow-xl mx-4 sm:mx-6 lg:mx-8 mt-4 border border-emerald-800">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/kromengan_hero_banner_1785558864158.jpg"
            alt="Pemandangan Alam Desa Kromengan Malang"
            className="w-full h-full object-cover opacity-35 filter brightness-90"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback image if needed
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-emerald-800/80 backdrop-blur-md text-emerald-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-emerald-600/50 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Selamat Datang di Portal Resmi Desa Kromengan</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md"
          >
            Mewujudkan Desa Kromengan yang <span className="text-emerald-400">Majum, Mandiri</span> & Berbudaya
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-sm sm:text-lg text-emerald-100/90 max-w-3xl mx-auto leading-relaxed"
          >
            Pusat informasi publik, layanan pengaduan online masyarakat, potensi pertanian tebu & UMKM unggulan Kecamatan Kromengan, Kabupaten Malang.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => onNavigate('layanan')}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-950/50 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Buat Pengaduan Online</span>
            </button>

            <button
              onClick={onCheckTicketModal}
              className="flex items-center gap-2 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 font-semibold px-6 py-3.5 rounded-xl border border-emerald-600/60 backdrop-blur-md transition-all text-sm sm:text-base"
            >
              <Search className="w-5 h-5 text-emerald-400" />
              <span>Cek Status Tiket</span>
            </button>

            <button
              onClick={() => onNavigate('potensi')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 backdrop-blur-md transition-all text-sm sm:text-base"
            >
              <TreePine className="w-5 h-5 text-emerald-400" />
              <span>Jelajahi Potensi Desa</span>
            </button>
          </motion.div>
        </div>

        {/* Quick Stat Badges Ticker */}
        <div className="relative z-10 bg-emerald-900/90 border-t border-emerald-800 py-4 px-6 backdrop-blur-md">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2">
              <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                <Users className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-black text-white">{statistik.totalPenduduk.toLocaleString('id-ID')}</span>
              </div>
              <p className="text-xs text-emerald-300 font-medium">Penduduk (Jiwa)</p>
            </div>
            
            <div className="p-2 border-l border-emerald-800">
              <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                <Map className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-black text-white">{statistik.jumlahDusun}</span>
              </div>
              <p className="text-xs text-emerald-300 font-medium">Wilayah Dusun</p>
            </div>

            <div className="p-2 border-l border-emerald-800">
              <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                <TreePine className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-black text-white">{statistik.luasWilayahHektar} Ha</span>
              </div>
              <p className="text-xs text-emerald-300 font-medium">Luas Wilayah</p>
            </div>

            <div className="p-2 border-l border-emerald-800">
              <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                <Wallet className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-black text-white">Rp 1.85 M</span>
              </div>
              <p className="text-xs text-emerald-300 font-medium">APBDes 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Services Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-1">
            Layanan Cepat Masyakarat
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Kemudahan Akses Layanan Publik Desa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div 
            onClick={() => onNavigate('layanan')}
            className="bg-emerald-50 hover:bg-emerald-100/80 p-6 rounded-2xl border border-emerald-200 transition-all cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
              Pengaduan Online
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Sampaikan aspirasi, keluhan jalan, kebersihan, atau pelayanan desa secara transparan.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-700 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Kirim Laporan</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={onCheckTicketModal}
            className="bg-emerald-50 hover:bg-emerald-100/80 p-6 rounded-2xl border border-emerald-200 transition-all cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 bg-emerald-700 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
              Cek Status Tiket
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Pantau perkembangan penanganan pengaduan Anda dengan memasukkan Kode Tiket resmi.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-700 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Lacak Status Tiket</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('layanan')}
            className="bg-emerald-50 hover:bg-emerald-100/80 p-6 rounded-2xl border border-emerald-200 transition-all cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 bg-emerald-800 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
              Syarat Permohonan Surat
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Cek persyaratan pembuatan Surat Keterangan Usaha (SKU), SKTM, SKCK, dan Domisili.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-700 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Lihat Syarat Surat</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={() => onNavigate('potensi')}
            className="bg-emerald-50 hover:bg-emerald-100/80 p-6 rounded-2xl border border-emerald-200 transition-all cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 bg-emerald-900 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TreePine className="w-6 h-6 text-emerald-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
              Potensi & UMKM Desa
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Produk unggulan pertanian tebu, keripik olahan singkong, serta kegiatan seni budaya.
            </p>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-700 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Jelajahi Produk UMKM</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* Sambutan Kepala Desa & Kantor Desa */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-emerald-100">
              <img
                src="/src/assets/images/kantor_desa_kromengan_1785558883266.jpg"
                alt="Kantor Desa Kromengan Malang"
                className="w-full h-72 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent p-4 text-white">
                <p className="text-sm font-bold">Kantor Kepala Desa Kromengan</p>
                <p className="text-xs text-emerald-300">Jl. Raya Kromengan No. 01, Kab. Malang</p>
              </div>
            </div>

            {/* Kades Badge Floating */}
            <div className="mt-4 bg-emerald-800 text-white p-4 rounded-xl shadow-md flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt="Bpk H. Sukadi"
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
              />
              <div>
                <h4 className="font-bold text-sm">Bpk. H. Sukadi, S.Sos.</h4>
                <p className="text-xs text-emerald-300">Kepala Desa Kromengan</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Sambutan Kepala Desa
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
              "Bersama Membangun Desa Kromengan yang Berdaya Saing dan Sejahtera"
            </h2>
            <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
              <p>
                Assalamu’alaikum Warahmatullahi Wabarakatuh,
              </p>
              <p>
                Selamat datang di website resmi Pemerintah Desa Kromengan, Kecamatan Kromengan, Kabupaten Malang. Portal digital ini hadir sebagai bentuk komitmen kami dalam keterbukaan informasi publik dan peningkatan efisiensi layanan masyarakat.
              </p>
              <p>
                Desa Kromengan menyimpan kekayaan potensi pertanian tebu yang melimpah, semangat gotong royong warga di 4 dusun, serta kreatifitas para pelaku UMKM lokal. Melalui media ini, kami mengajak seluruh warga dan elemen masyarakat untuk bersama-sama mengawal pembangunan desa secara transparan dan berkesinambungan.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('tentang')}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                <span>Profil Selengkapnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('pemerintahan')}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>Struktur Pemerintah Desa</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Potensi Desa Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-1">
              Keunggulan Lokal
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Potensi Unggulan Desa Kromengan
            </p>
          </div>
          <button
            onClick={() => onNavigate('potensi')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>Lihat Semua Potensi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPotensi.map((potensi) => (
            <div
              key={potensi.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={potensi.gambar}
                  alt={potensi.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">
                  {potensi.kategori}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-emerald-700 transition-colors">
                    {potensi.nama}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {potensi.deskripsi}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-emerald-800 font-medium">
                  <span>📍 {potensi.lokasi}</span>
                  <span className="text-emerald-600">Unggulan ★</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News & Announcements Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-1">
              Kabar Terkini
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Informasi & Berita Terbaru Desa
            </p>
          </div>
          <button
            onClick={() => onNavigate('informasi')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>Lihat Semua Berita</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestBerita.map((berita) => (
            <div
              key={berita.id}
              onClick={() => onNavigate('informasi')}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={berita.gambar}
                  alt={berita.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                  {berita.kategori}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {berita.tanggal}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {berita.dibaca}x
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2">
                    {berita.judul}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {berita.ringkasan}
                  </p>
                </div>
                <div className="mt-4 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency & Quick Contact Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-bold uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Kontak Darurat & Layanan Cepat</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Membutuhkan Bantuan atau Layanan Darurat Desa Kromengan?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl">
              Hubungi Sekretariat Kantor Desa di (0341) 395000 atau WhatsApp Layanan Pengaduan 0812-3456-7890.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('kontak')}
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-colors shadow-md"
            >
              Hubungi Pemdes Kromengan
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
