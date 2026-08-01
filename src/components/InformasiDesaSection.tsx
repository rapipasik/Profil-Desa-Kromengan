import React, { useState } from 'react';
import { BeritaItem, StatistikDesa } from '../types';
import { Newspaper, Calendar, Eye, Search, PieChart, BarChart2, DollarSign, X, CheckCircle } from 'lucide-react';

interface InformasiDesaSectionProps {
  beritaList: BeritaItem[];
  statistik: StatistikDesa;
}

export const InformasiDesaSection: React.FC<InformasiDesaSectionProps> = ({
  beritaList,
  statistik,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'berita' | 'apbdes' | 'statistik'>('berita');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<BeritaItem | null>(null);

  const kategoris = ['Semua', 'Berita', 'Pengumuman', 'Agenda', 'Prestasi'];

  const filteredBerita = beritaList.filter(b => {
    const matchKat = selectedKategori === 'Semua' || b.kategori === selectedKategori;
    const matchSearch = b.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.ringkasan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.konten.toLowerCase().includes(searchQuery.toLowerCase());
    return matchKat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden border border-emerald-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block bg-emerald-800 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Pusat Informasi & Keterbukaan Publik
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Informasi, Berita & Transparansi Desa
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Menyajikan berita resmi pembangunan Desa Kromengan, pengumuman agenda kegiatan, transparansi APBDes, serta statistik kependudukan secara real-time.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubTab('berita')}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'berita'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Berita & Pengumuman</span>
        </button>

        <button
          onClick={() => setActiveSubTab('apbdes')}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'apbdes'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Transparansi APBDes 2026</span>
        </button>

        <button
          onClick={() => setActiveSubTab('statistik')}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'statistik'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Data Statistik Penduduk</span>
        </button>
      </div>

      {/* SUB-TAB 1: BERITA & PENGUMUMAN */}
      {activeSubTab === 'berita' && (
        <div className="space-y-6">
          
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {kategoris.map((kat) => (
                <button
                  key={kat}
                  onClick={() => setSelectedKategori(kat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedKategori === kat
                      ? 'bg-emerald-700 text-white font-semibold'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari berita desa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBerita.length === 0 ? (
              <div className="col-span-full bg-white p-12 rounded-2xl border border-gray-100 text-center text-gray-500">
                <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-semibold text-gray-700">Tidak ada berita ditemukan</p>
                <p className="text-xs text-gray-400 mt-1">Coba kata kunci pencarian yang berbeda.</p>
              </div>
            ) : (
              filteredBerita.map((berita) => (
                <div
                  key={berita.id}
                  onClick={() => setReadingArticle(berita)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={berita.gambar}
                      alt={berita.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
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
                          {berita.dibaca} dibaca
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2">
                        {berita.judul}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {berita.ringkasan}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-semibold text-emerald-700 flex items-center justify-between">
                      <span>Penulis: {berita.penulis}</span>
                      <span className="text-emerald-800">Baca Selengkapnya →</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TRANSPARANSI APBDES */}
      {activeSubTab === 'apbdes' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-8">
          <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Transparansi APBDes Kromengan 2026</h2>
              <p className="text-xs text-gray-500">Laporan Realisasi Anggaran Pendapatan dan Belanja Desa</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-4 py-1.5 rounded-full text-xs">
              Tahun Anggaran 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pendapatan Card */}
            <div className="bg-emerald-50/80 p-6 rounded-2xl border border-emerald-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-900 text-base">Pendapatan Desa</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  Total: Rp {statistik.pendapatanDesa.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="space-y-3 text-xs text-gray-700">
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-emerald-100">
                  <span>Dana Desa (APBN)</span>
                  <span className="font-bold text-emerald-900">Rp 980.000.000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-emerald-100">
                  <span>Alokasi Dana Desa (ADD Kab. Malang)</span>
                  <span className="font-bold text-emerald-900">Rp 650.000.000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-emerald-100">
                  <span>Bagi Hasil Pajak & Retribusi</span>
                  <span className="font-bold text-emerald-900">Rp 120.000.000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-emerald-100">
                  <span>Pendapatan Asli Desa (PADes)</span>
                  <span className="font-bold text-emerald-900">Rp 100.000.000</span>
                </div>
              </div>
            </div>

            {/* Belanja Card */}
            <div className="bg-emerald-50/80 p-6 rounded-2xl border border-emerald-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-900 text-base">Belanja Desa</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  Total: Rp {statistik.belanjaDesa.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="space-y-3 text-xs text-gray-700">
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-emerald-100">
                  <span>Bidang Pembangunan Desa (Irigasi & Jalan)</span>
                  <span className="font-bold text-emerald-900">Rp 750.000.000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-emerald-100">
                  <span>Penyelenggaraan Pemerintahan Desa</span>
                  <span className="font-bold text-emerald-900">Rp 510.000.000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-emerald-100">
                  <span>Pembinaan & Pemberdayaan Masyarakat</span>
                  <span className="font-bold text-emerald-900">Rp 350.000.000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-emerald-100">
                  <span>Penanggulangan Bencana & Darurat</span>
                  <span className="font-bold text-emerald-900">Rp 200.000.000</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB-TAB 3: DATA STATISTIK PENDUDUK */}
      {activeSubTab === 'statistik' && (
        <div className="space-y-8">
          
          {/* Main Stat Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">Total Penduduk</p>
              <p className="text-2xl font-black text-emerald-800 mt-1">
                {statistik.totalPenduduk.toLocaleString('id-ID')} Jiwa
              </p>
              <p className="text-[11px] text-emerald-600 mt-1">Tersebar di 4 Dusun</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">Laki-Laki / Perempuan</p>
              <p className="text-2xl font-black text-emerald-800 mt-1">
                {statistik.jumlahLakiLaki} / {statistik.jumlahPerempuan}
              </p>
              <p className="text-[11px] text-emerald-600 mt-1">Rasio Gender Seimbang</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">Jumlah Kepala Keluarga</p>
              <p className="text-2xl font-black text-emerald-800 mt-1">
                {statistik.jumlahKK.toLocaleString('id-ID')} KK
              </p>
              <p className="text-[11px] text-emerald-600 mt-1">Data Terverifikasi 2026</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 font-medium">Luas Wilayah</p>
              <p className="text-2xl font-black text-emerald-800 mt-1">
                {statistik.luasWilayahHektar} Ha
              </p>
              <p className="text-[11px] text-emerald-600 mt-1">Sentra Tebu & Padi</p>
            </div>
          </div>

          {/* Graphical Distributions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Pekerjaan */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Mata Pencaharian Penduduk</h3>
              <div className="space-y-3">
                {statistik.pekerjaanStats.map((item, idx) => {
                  const percent = Math.round((item.jumlah / statistik.totalPenduduk) * 100);
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-gray-700">{item.jenis}</span>
                        <span className="text-gray-500">{item.jumlah} Jiwa ({percent}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-700 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(percent * 2, 8)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pendidikan */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Tingkat Pendidikan Penduduk</h3>
              <div className="space-y-3">
                {statistik.pendidikanStats.map((item, idx) => {
                  const percent = Math.round((item.jumlah / statistik.totalPenduduk) * 100);
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-gray-700">{item.tingkat}</span>
                        <span className="text-gray-500">{item.jumlah} Jiwa ({percent}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(percent * 2, 8)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="relative h-64 bg-gray-100">
              <img
                src={readingArticle.gambar}
                alt={readingArticle.judul}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-3 left-3 bg-emerald-800 text-white text-xs font-semibold px-3 py-1 rounded-lg">
                {readingArticle.kategori}
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {readingArticle.tanggal}
                </span>
                <span>• Penulis: {readingArticle.penulis}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {readingArticle.judul}
              </h2>

              <div className="text-xs sm:text-sm text-gray-700 space-y-4 leading-relaxed whitespace-pre-line border-t border-gray-100 pt-4">
                {readingArticle.konten}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Tutup Baca Berita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
