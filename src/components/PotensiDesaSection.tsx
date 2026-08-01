import React, { useState } from 'react';
import { PotensiItem } from '../types';
import { Sprout, ShoppingBag, Utensils, Music, Search, Phone, MapPin, X, CheckCircle2 } from 'lucide-react';

interface PotensiDesaSectionProps {
  potensiList: PotensiItem[];
}

export const PotensiDesaSection: React.FC<PotensiDesaSectionProps> = ({ potensiList }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailModalItem, setDetailModalItem] = useState<PotensiItem | null>(null);

  const categories = [
    'Semua',
    'Pertanian & Perkebunan',
    'UMKM & Olahan',
    'Peternakan',
    'Wisata & Seni Budaya'
  ];

  const filteredList = potensiList.filter(item => {
    const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden border border-emerald-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block bg-emerald-800 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Sektor Ekonomi & Budaya
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Potensi Unggulan Desa Kromengan
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Menjelajahi hasil komoditas pertanian tebu & padi, produk kreatif UMKM lokal, peternakan, serta pelestarian kesenian budaya khas Malang dari Desa Kromengan.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm font-semibold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari potensi atau UMKM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

      </div>

      {/* Potensi Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-2xl border border-gray-100 text-center text-gray-500">
            <Sprout className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="font-semibold text-gray-700">Tidak ada potensi ditemukan</p>
            <p className="text-xs text-gray-400 mt-1">Coba gunakan kata kunci lain atau pilih kategori Semua.</p>
          </div>
        ) : (
          filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-sm">
                  {item.kategori}
                </span>
                {item.unggulan && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    UNGGULAN DESA
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-emerald-700 transition-colors">
                    {item.nama}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1 text-emerald-800 font-medium truncate max-w-[200px]">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {item.lokasi}
                    </span>
                  </div>

                  <button
                    onClick={() => setDetailModalItem(item)}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Detail Informasi & Kontak</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {detailModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
            <div className="relative h-56 bg-gray-100">
              <img
                src={detailModalItem.gambar}
                alt={detailModalItem.nama}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setDetailModalItem(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-3 left-3 bg-emerald-800 text-white text-xs font-semibold px-3 py-1 rounded-lg">
                {detailModalItem.kategori}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{detailModalItem.nama}</h3>
                <p className="text-xs text-emerald-700 font-medium mt-1">
                  📍 {detailModalItem.lokasi}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs text-gray-700 space-y-2 leading-relaxed">
                <h4 className="font-bold text-gray-900">Deskripsi & Potensi:</h4>
                <p>{detailModalItem.deskripsi}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <p className="text-gray-500">Pengelola / Penanggungjawab:</p>
                  <p className="font-bold text-emerald-900 mt-0.5">{detailModalItem.pengelola}</p>
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <p className="text-gray-500">Kontak Pembinaan / Pemesanan:</p>
                  <p className="font-bold text-emerald-900 mt-0.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {detailModalItem.kontak}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setDetailModalItem(null)}
                  className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Tutup Informasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
