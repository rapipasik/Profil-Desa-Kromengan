import React, { useState } from 'react';
import {
  BeritaItem,
  PotensiItem,
  AparaturItem,
  PengaduanItem,
  StatistikData
} from '../types';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  ShoppingBag,
  Users,
  BarChart3,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Save,
  Search,
  Filter
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  beritaList: BeritaItem[];
  potensiList: PotensiItem[];
  aparaturList: AparaturItem[];
  pengaduanList: PengaduanItem[];
  statistik: StatistikData;
  onUpdateBerita: (list: BeritaItem[]) => void;
  onUpdatePotensi: (list: PotensiItem[]) => void;
  onUpdateAparatur: (list: AparaturItem[]) => void;
  onUpdatePengaduanStatus: (id: string, status: PengaduanItem['status'], tanggapan?: string) => void;
  onUpdateStatistik: (stat: StatistikData) => void;
}

export const AdminDashboardSection: React.FC<AdminDashboardProps> = ({
  onLogout,
  beritaList,
  potensiList,
  aparaturList,
  pengaduanList,
  statistik,
  onUpdateBerita,
  onUpdatePotensi,
  onUpdateAparatur,
  onUpdatePengaduanStatus,
  onUpdateStatistik
}) => {
  const [activeTab, setActiveTab] = useState<'pengaduan' | 'berita' | 'potensi' | 'aparatur' | 'statistik'>('pengaduan');

  // Search & Filter state
  const [pengaduanSearch, setPengaduanSearch] = useState('');
  const [pengaduanDusunFilter, setPengaduanDusunFilter] = useState('Semua');
  const [pengaduanStatusFilter, setPengaduanStatusFilter] = useState('Semua');

  const [beritaSearch, setBeritaSearch] = useState('');
  const [potensiSearch, setPotensiSearch] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State for Modal / Editing
  const [editingPengaduan, setEditingPengaduan] = useState<PengaduanItem | null>(null);
  const [tanggapanText, setTanggapanText] = useState('');
  const [newStatus, setNewStatus] = useState<PengaduanItem['status']>('Diproses');

  // Berita Form
  const [showBeritaModal, setShowBeritaModal] = useState(false);
  const [beritaForm, setBeritaForm] = useState<Partial<BeritaItem>>({
    judul: '',
    kategori: 'Berita',
    ringkasan: '',
    konten: '',
    gambar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800',
    penulis: 'Sekretariat Desa Kromengan'
  });
  const [editingBeritaId, setEditingBeritaId] = useState<string | null>(null);

  // Potensi Form
  const [showPotensiModal, setShowPotensiModal] = useState(false);
  const [potensiForm, setPotensiForm] = useState<Partial<PotensiItem>>({
    nama: '',
    kategori: 'UMKM & Kuliner',
    deskripsi: '',
    pemilik: '',
    kontak: '',
    lokasi: '',
    gambar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    hargaRange: 'Rp 10.000 - Rp 50.000'
  });
  const [editingPotensiId, setEditingPotensiId] = useState<string | null>(null);

  // Aparatur Form
  const [showAparaturModal, setShowAparaturModal] = useState(false);
  const [aparaturForm, setAparaturForm] = useState<Partial<AparaturItem>>({
    nama: '',
    jabatan: '',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    pendidikan: 'S1 Sederajat',
    dusun: 'Krajan'
  });

  // Handle Save Berita
  const handleSaveBerita = (e: React.FormEvent) => {
    e.preventDefault();
    if (!beritaForm.judul || !beritaForm.ringkasan) return;

    if (editingBeritaId) {
      const updated = beritaList.map((item) =>
        item.id === editingBeritaId
          ? ({ ...item, ...beritaForm } as BeritaItem)
          : item
      );
      onUpdateBerita(updated);
    } else {
      const newItem: BeritaItem = {
        id: `brt-${Date.now()}`,
        judul: beritaForm.judul || '',
        kategori: beritaForm.kategori || 'Berita',
        tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        ringkasan: beritaForm.ringkasan || '',
        konten: beritaForm.konten || beritaForm.ringkasan || '',
        gambar: beritaForm.gambar || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800',
        penulis: beritaForm.penulis || 'Admin Desa'
      };
      onUpdateBerita([newItem, ...beritaList]);
    }

    setShowBeritaModal(false);
    setEditingBeritaId(null);
  };

  const handleDeleteBerita = (id: string) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      onUpdateBerita(beritaList.filter((b) => b.id !== id));
    }
  };

  // Handle Save Potensi
  const handleSavePotensi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!potensiForm.nama || !potensiForm.deskripsi) return;

    if (editingPotensiId) {
      const updated = potensiList.map((item) =>
        item.id === editingPotensiId ? ({ ...item, ...potensiForm } as PotensiItem) : item
      );
      onUpdatePotensi(updated);
    } else {
      const newItem: PotensiItem = {
        id: `ptn-${Date.now()}`,
        nama: potensiForm.nama || '',
        kategori: potensiForm.kategori || 'UMKM & Kuliner',
        deskripsi: potensiForm.deskripsi || '',
        pemilik: potensiForm.pemilik || 'Warga Desa',
        kontak: potensiForm.kontak || '08123456789',
        lokasi: potensiForm.lokasi || 'Desa Kromengan',
        gambar: potensiForm.gambar || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
        hargaRange: potensiForm.hargaRange || 'Variatif'
      };
      onUpdatePotensi([newItem, ...potensiList]);
    }

    setShowPotensiModal(false);
    setEditingPotensiId(null);
  };

  const handleDeletePotensi = (id: string) => {
    if (confirm('Yakin menghapus data UMKM/Potensi ini?')) {
      onUpdatePotensi(potensiList.filter((p) => p.id !== id));
    }
  };

  // Handle Save Aparatur
  const handleSaveAparatur = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aparaturForm.nama || !aparaturForm.jabatan) return;

    const newItem: AparaturItem = {
      id: `apr-${Date.now()}`,
      nama: aparaturForm.nama || '',
      jabatan: aparaturForm.jabatan || '',
      foto: aparaturForm.foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      pendidikan: aparaturForm.pendidikan || 'SMA Sederajat',
      dusun: aparaturForm.dusun || 'Krajan'
    };
    onUpdateAparatur([...aparaturList, newItem]);
    setShowAparaturModal(false);
  };

  const handleDeleteAparatur = (id: string) => {
    if (confirm('Hapus perangkat desa ini?')) {
      onUpdateAparatur(aparaturList.filter((a) => a.id !== id));
    }
  };

  // Respond to Pengaduan
  const handleTanggapiPengaduan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPengaduan) return;
    onUpdatePengaduanStatus(editingPengaduan.id, newStatus, tanggapanText);
    setEditingPengaduan(null);
    setTanggapanText('');
    showToast(`Pengaduan ${editingPengaduan.kodeTiket} berhasil ditanggapi!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">

      {/* Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-600 flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
      
      {/* Top Banner Dashboard */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-emerald-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-800 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Panel Administrator
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              Sistem Desa Kromengan
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dashboard Pengelolaan Website Desa
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 mt-1">
            Selamat datang, Administrator Pemdes Kromengan. Kelola laporan warga, berita, potensi desa, dan statistik secara akurat.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-md shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Admin</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTab('pengaduan')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'pengaduan'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Pengaduan Warga ({pengaduanList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('berita')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'berita'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Berita & Pengumuman ({beritaList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('potensi')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'potensi'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Potensi & UMKM ({potensiList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('aparatur')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'aparatur'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Aparatur Desa ({aparaturList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('statistik')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'statistik'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Data Statistik</span>
        </button>
      </div>

      {/* TAB CONTENT: PENGADUAN */}
      {activeTab === 'pengaduan' && (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Daftar Pengaduan Masuk</h2>
              <p className="text-xs text-gray-500">
                Berikan tanggapan resmi dan perbarui status laporan warga Desa Kromengan.
              </p>
            </div>
          </div>

          {/* Quick KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
              <span className="text-[11px] text-slate-500 font-semibold">Total Pengaduan</span>
              <p className="text-xl font-black text-slate-900">{pengaduanList.length}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl">
              <span className="text-[11px] text-amber-700 font-semibold">Menunggu</span>
              <p className="text-xl font-black text-amber-900">
                {pengaduanList.filter(p => p.status === 'Menunggu').length}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl">
              <span className="text-[11px] text-blue-700 font-semibold">Diproses</span>
              <p className="text-xl font-black text-blue-900">
                {pengaduanList.filter(p => p.status === 'Diproses').length}
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
              <span className="text-[11px] text-emerald-700 font-semibold">Selesai</span>
              <p className="text-xl font-black text-emerald-900">
                {pengaduanList.filter(p => p.status === 'Selesai').length}
              </p>
            </div>
          </div>

          {/* Filters & Search Bar */}
          <div className="flex flex-col md:flex-row gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari berdasarkan kode tiket, nama pelapor, atau judul..."
                value={pengaduanSearch}
                onChange={(e) => setPengaduanSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={pengaduanDusunFilter}
                onChange={(e) => setPengaduanDusunFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Semua">Semua Dusun</option>
                <option value="Krajan">Dusun Krajan</option>
                <option value="Ringinanom">Dusun Ringinanom</option>
                <option value="Balokan">Dusun Balokan</option>
              </select>
              <select
                value={pengaduanStatusFilter}
                onChange={(e) => setPengaduanStatusFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Semua">Semua Status</option>
                <option value="Menunggu">Menunggu</option>
                <option value="Diproses">Diproses</option>
                <option value="Selesai">Selesai</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </div>
          </div>

          {/* Pengaduan Table */}
          {(() => {
            const filteredPengaduan = pengaduanList.filter(item => {
              const matchSearch =
                item.kodeTiket.toLowerCase().includes(pengaduanSearch.toLowerCase()) ||
                item.namaPelapor.toLowerCase().includes(pengaduanSearch.toLowerCase()) ||
                item.judul.toLowerCase().includes(pengaduanSearch.toLowerCase());
              const matchDusun = pengaduanDusunFilter === 'Semua' || item.dusun === pengaduanDusunFilter;
              const matchStatus = pengaduanStatusFilter === 'Semua' || item.status === pengaduanStatusFilter;
              return matchSearch && matchDusun && matchStatus;
            });

            if (filteredPengaduan.length === 0) {
              return (
                <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 space-y-2">
                  <p className="text-xs text-gray-500 font-medium">Tidak ada pengaduan yang sesuai dengan filter/pencarian Anda.</p>
                </div>
              );
            }

            return (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700 border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px] tracking-wider">
                      <th className="p-3">Kode Tiket</th>
                      <th className="p-3">Pelapor / Kontak</th>
                      <th className="p-3">Judul & Kategori</th>
                      <th className="p-3">Dusun</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredPengaduan.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="p-3 font-mono font-bold text-emerald-900">{item.kodeTiket}</td>
                        <td className="p-3">
                          <div className="font-bold text-gray-900">{item.namaPelapor}</div>
                          <div className="text-[11px] text-gray-400">{item.kontak || item.telepon}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-gray-900 line-clamp-1">{item.judul}</div>
                          <div className="text-[11px] text-emerald-700">{item.kategori}</div>
                        </td>
                        <td className="p-3">Dusun {item.dusun}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              item.status === 'Selesai'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'Diproses'
                                ? 'bg-blue-100 text-blue-800'
                                : item.status === 'Ditolak'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              setEditingPengaduan(item);
                              setNewStatus(item.status);
                              setTanggapanText(item.tanggapanAdmin || '');
                            }}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors"
                          >
                            Tanggapi
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB CONTENT: BERITA */}
      {activeTab === 'berita' && (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Kelola Berita & Pengumuman</h2>
              <p className="text-xs text-gray-500">Tambah atau ubah publikasi resmi desa.</p>
            </div>
            <button
              onClick={() => {
                setEditingBeritaId(null);
                setBeritaForm({
                  judul: '',
                  kategori: 'Berita',
                  ringkasan: '',
                  konten: '',
                  gambar: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=800',
                  penulis: 'Sekretariat Desa Kromengan'
                });
                setShowBeritaModal(true);
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Berita Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beritaList.map((item) => (
              <div key={item.id} className="border border-gray-100 p-4 rounded-2xl bg-gray-50/50 flex gap-4">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">{item.kategori}</span>
                  <h3 className="font-bold text-xs text-gray-900 line-clamp-1">{item.judul}</h3>
                  <p className="text-[11px] text-gray-500 line-clamp-2">{item.ringkasan}</p>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        setEditingBeritaId(item.id);
                        setBeritaForm(item);
                        setShowBeritaModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-[11px] font-bold flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBerita(item.id)}
                      className="text-red-600 hover:text-red-800 text-[11px] font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: POTENSI */}
      {activeTab === 'potensi' && (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Kelola Potensi Desa & UMKM</h2>
              <p className="text-xs text-gray-500">Publikasikan produk unggulan warga Kromengan.</p>
            </div>
            <button
              onClick={() => {
                setEditingPotensiId(null);
                setPotensiForm({
                  nama: '',
                  kategori: 'UMKM & Kuliner',
                  deskripsi: '',
                  pemilik: '',
                  kontak: '',
                  lokasi: '',
                  gambar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
                  hargaRange: 'Rp 10.000 - Rp 50.000'
                });
                setShowPotensiModal(true);
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Potensi / UMKM</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {potensiList.map((item) => (
              <div key={item.id} className="border border-gray-100 p-4 rounded-2xl bg-gray-50/50 flex gap-4">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">{item.kategori}</span>
                  <h3 className="font-bold text-xs text-gray-900">{item.nama}</h3>
                  <p className="text-[11px] text-gray-500 line-clamp-1">{item.deskripsi}</p>
                  <p className="text-[10px] text-gray-400">Pemilik: {item.pemilik}</p>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        setEditingPotensiId(item.id);
                        setPotensiForm(item);
                        setShowPotensiModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-[11px] font-bold flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeletePotensi(item.id)}
                      className="text-red-600 hover:text-red-800 text-[11px] font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: APARATUR */}
      {activeTab === 'aparatur' && (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Kelola Aparatur Desa</h2>
              <p className="text-xs text-gray-500">Daftar perangkat desa yang melayani masyarakat.</p>
            </div>
            <button
              onClick={() => {
                setAparaturForm({
                  nama: '',
                  jabatan: '',
                  foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
                  pendidikan: 'S1 Sederajat',
                  dusun: 'Krajan'
                });
                setShowAparaturModal(true);
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Perangkat Desa</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {aparaturList.map((item) => (
              <div key={item.id} className="border border-gray-100 p-4 rounded-2xl bg-gray-50/50 flex items-center gap-3">
                <img
                  src={item.foto}
                  alt={item.nama}
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 space-y-0.5">
                  <h3 className="font-bold text-xs text-gray-900">{item.nama}</h3>
                  <p className="text-[11px] font-semibold text-emerald-700">{item.jabatan}</p>
                  <p className="text-[10px] text-gray-400">Pendidikan: {item.pendidikan}</p>
                  <button
                    onClick={() => handleDeleteAparatur(item.id)}
                    className="text-red-600 hover:text-red-800 text-[10px] font-bold flex items-center gap-1 pt-1"
                  >
                    <Trash2 className="w-3 h-3" /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: STATISTIK */}
      {activeTab === 'statistik' && (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-gray-900">Perbarui Data Statistik & APBDes</h2>
            <p className="text-xs text-gray-500">
              Data yang Anda ubah di sini akan langsung memperbarui grafik publik di beranda & menu statistik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Demografi Penduduk</h3>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Total Penduduk (Jiwa)</label>
                <input
                  type="number"
                  value={statistik.totalPenduduk || 0}
                  onChange={(e) => onUpdateStatistik({ ...statistik, totalPenduduk: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Laki-Laki</label>
                  <input
                    type="number"
                    value={statistik.jumlahLakiLaki || 0}
                    onChange={(e) => onUpdateStatistik({ ...statistik, jumlahLakiLaki: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Perempuan</label>
                  <input
                    type="number"
                    value={statistik.jumlahPerempuan || 0}
                    onChange={(e) => onUpdateStatistik({ ...statistik, jumlahPerempuan: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Total Kepala Keluarga (KK)</label>
                <input
                  type="number"
                  value={statistik.jumlahKK || 0}
                  onChange={(e) => onUpdateStatistik({ ...statistik, jumlahKK: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Anggaran APBDes {statistik.apbdesTahun || 2026}</h3>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Pendapatan Desa (Rp)</label>
                <input
                  type="number"
                  value={statistik.pendapatanDesa || 0}
                  onChange={(e) =>
                    onUpdateStatistik({
                      ...statistik,
                      pendapatanDesa: Number(e.target.value)
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Belanja Desa (Rp)</label>
                <input
                  type="number"
                  value={statistik.belanjaDesa || 0}
                  onChange={(e) =>
                    onUpdateStatistik({
                      ...statistik,
                      belanjaDesa: Number(e.target.value)
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Luas Wilayah (Hektar)</label>
                <input
                  type="number"
                  value={statistik.luasWilayahHektar || 0}
                  onChange={(e) =>
                    onUpdateStatistik({
                      ...statistik,
                      luasWilayahHektar: Number(e.target.value)
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* Dusun Breakdown Section */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <h3 className="font-bold text-xs text-gray-900 uppercase tracking-wider">
              Rincian Per Dusun (3 Dusun Utama)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(statistik.dusunStats || []).map((ds, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 p-3.5 rounded-2xl space-y-2">
                  <span className="font-bold text-xs text-emerald-900">{ds.namaDusun}</span>
                  <div>
                    <label className="block text-[11px] text-gray-500 font-medium">Jumlah Penduduk</label>
                    <input
                      type="number"
                      value={ds.jumlahPenduduk || 0}
                      onChange={(e) => {
                        const newDusun = [...(statistik.dusunStats || [])];
                        newDusun[idx] = { ...ds, jumlahPenduduk: Number(e.target.value) };
                        onUpdateStatistik({ ...statistik, dusunStats: newDusun });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 font-medium">Jumlah KK</label>
                    <input
                      type="number"
                      value={ds.jumlahKK || 0}
                      onChange={(e) => {
                        const newDusun = [...(statistik.dusunStats || [])];
                        newDusun[idx] = { ...ds, jumlahKK: Number(e.target.value) };
                        onUpdateStatistik({ ...statistik, dusunStats: newDusun });
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end border-t border-gray-100">
            <button
              onClick={() => showToast('Data statistik & APBDes Desa Kromengan berhasil diperbarui!')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Statistik</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL RESPOND PENGADUAN */}
      {editingPengaduan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-gray-900">
              Tanggapi Pengaduan: {editingPengaduan.kodeTiket}
            </h3>
            <div className="bg-gray-50 p-3 rounded-xl text-xs space-y-1 border border-gray-200">
              <p className="font-bold text-gray-900">{editingPengaduan.judul}</p>
              <p className="text-gray-600">{editingPengaduan.isiPesan}</p>
            </div>

            <form onSubmit={handleTanggapiPengaduan} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Status Pengaduan</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as PengaduanItem['status'])}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Tanggapan Resmi Perangkat Desa
                </label>
                <textarea
                  rows={3}
                  required
                  value={tanggapanText}
                  onChange={(e) => setTanggapanText(e.target.value)}
                  placeholder="Tuliskan tindakan atau jawaban pemerintah desa..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPengaduan(null)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                >
                  Simpan Tanggapan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT BERITA */}
      {showBeritaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl my-8">
            <h3 className="font-bold text-base text-gray-900">
              {editingBeritaId ? 'Edit Berita' : 'Tambah Berita Baru'}
            </h3>
            <form onSubmit={handleSaveBerita} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Judul Berita</label>
                <input
                  type="text"
                  required
                  value={beritaForm.judul || ''}
                  onChange={(e) => setBeritaForm({ ...beritaForm, judul: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kategori</label>
                  <select
                    value={beritaForm.kategori || 'Berita'}
                    onChange={(e) => setBeritaForm({ ...beritaForm, kategori: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  >
                    <option value="Berita">Berita</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Kegiatan">Kegiatan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Penulis</label>
                  <input
                    type="text"
                    value={beritaForm.penulis || ''}
                    onChange={(e) => setBeritaForm({ ...beritaForm, penulis: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">URL Gambar Header</label>
                <input
                  type="text"
                  value={beritaForm.gambar || ''}
                  onChange={(e) => setBeritaForm({ ...beritaForm, gambar: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Ringkasan Singkat</label>
                <textarea
                  rows={2}
                  required
                  value={beritaForm.ringkasan || ''}
                  onChange={(e) => setBeritaForm({ ...beritaForm, ringkasan: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Konten Lengkap</label>
                <textarea
                  rows={4}
                  value={beritaForm.konten || ''}
                  onChange={(e) => setBeritaForm({ ...beritaForm, konten: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowBeritaModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                >
                  Simpan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT POTENSI */}
      {showPotensiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl my-8">
            <h3 className="font-bold text-base text-gray-900">
              {editingPotensiId ? 'Edit Potensi / UMKM' : 'Tambah Potensi / UMKM'}
            </h3>
            <form onSubmit={handleSavePotensi} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Potensi / Produk</label>
                <input
                  type="text"
                  required
                  value={potensiForm.nama || ''}
                  onChange={(e) => setPotensiForm({ ...potensiForm, nama: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kategori</label>
                  <select
                    value={potensiForm.kategori || 'UMKM & Kuliner'}
                    onChange={(e) => setPotensiForm({ ...potensiForm, kategori: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  >
                    <option value="Pertanian">Pertanian</option>
                    <option value="Peternakan">Peternakan</option>
                    <option value="UMKM & Kuliner">UMKM & Kuliner</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Pariwisata">Pariwisata</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Pemilik / Pengelola</label>
                  <input
                    type="text"
                    value={potensiForm.pemilik || ''}
                    onChange={(e) => setPotensiForm({ ...potensiForm, pemilik: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kontak WA / Telepon</label>
                  <input
                    type="text"
                    value={potensiForm.kontak || ''}
                    onChange={(e) => setPotensiForm({ ...potensiForm, kontak: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kisaran Harga</label>
                  <input
                    type="text"
                    value={potensiForm.hargaRange || ''}
                    onChange={(e) => setPotensiForm({ ...potensiForm, hargaRange: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">URL Gambar</label>
                <input
                  type="text"
                  value={potensiForm.gambar || ''}
                  onChange={(e) => setPotensiForm({ ...potensiForm, gambar: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Lengkap</label>
                <textarea
                  rows={3}
                  required
                  value={potensiForm.deskripsi || ''}
                  onChange={(e) => setPotensiForm({ ...potensiForm, deskripsi: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowPotensiModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                >
                  Simpan Potensi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL APARATUR */}
      {showAparaturModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-gray-900">Tambah Perangkat Desa</h3>
            <form onSubmit={handleSaveAparatur} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={aparaturForm.nama || ''}
                  onChange={(e) => setAparaturForm({ ...aparaturForm, nama: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Jabatan</label>
                <input
                  type="text"
                  required
                  placeholder="Kepala Desa / Sekdes / Kasie / Kasun..."
                  value={aparaturForm.jabatan || ''}
                  onChange={(e) => setAparaturForm({ ...aparaturForm, jabatan: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Pendidikan</label>
                <input
                  type="text"
                  value={aparaturForm.pendidikan || ''}
                  onChange={(e) => setAparaturForm({ ...aparaturForm, pendidikan: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Dusun / Wilayah Kerja</label>
                <select
                  value={aparaturForm.dusun || 'Krajan'}
                  onChange={(e) => setAparaturForm({ ...aparaturForm, dusun: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                >
                  <option value="Sekretariat">Sekretariat Balai Desa</option>
                  <option value="Krajan">Dusun Krajan</option>
                  <option value="Ringinanom">Dusun Ringinanom</option>
                  <option value="Balokan">Dusun Balokan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">URL Foto Profil</label>
                <input
                  type="text"
                  value={aparaturForm.foto || ''}
                  onChange={(e) => setAparaturForm({ ...aparaturForm, foto: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAparaturModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                >
                  Simpan Aparatur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
