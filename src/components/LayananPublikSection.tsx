import React, { useState } from 'react';
import { PengaduanItem, LayananSurat } from '../types';
import { LAYANAN_SURAT_LIST } from '../data/initialData';
import { 
  MessageSquare, 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Copy, 
  Check, 
  Send, 
  User, 
  Phone, 
  MapPin, 
  Tag, 
  ShieldCheck,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

interface LayananPublikSectionProps {
  onAddPengaduan: (data: Partial<PengaduanItem>) => Promise<{ success: boolean; data?: PengaduanItem }>;
  onCekTiket: (kodeTiket: string) => Promise<{ success: boolean; data?: PengaduanItem; message?: string }>;
  initialTicketQuery?: string;
}

export const LayananPublikSection: React.FC<LayananPublikSectionProps> = ({
  onAddPengaduan,
  onCekTiket,
  initialTicketQuery = ''
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'cek' | 'surat'>('form');

  // Form states
  const [namaPelapor, setNamaPelapor] = useState('');
  const [nik, setNik] = useState('');
  const [telepon, setTelepon] = useState('');
  const [dusun, setDusun] = useState<'Krajan' | 'Ringinanom' | 'Balokan'>('Krajan');
  const [kategori, setKategori] = useState<PengaduanItem['kategori']>('Infrastruktur & Jalan');
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [lampiranUrl, setLampiranUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<PengaduanItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [formError, setFormError] = useState('');

  // Ticket status check states
  const [ticketInput, setTicketInput] = useState(initialTicketQuery);
  const [checking, setChecking] = useState(false);
  const [ticketResult, setTicketResult] = useState<PengaduanItem | null>(null);
  const [ticketError, setTicketError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!namaPelapor || !nik || !telepon || !judul || !isi) {
      setFormError('Mohon lengkapi semua bidang yang bertanda bintang (*)');
      return;
    }

    if (nik.length < 16) {
      setFormError('Nomor NIK harus berjumlah 16 digit angka');
      return;
    }

    setSubmitting(true);
    try {
      const res = await onAddPengaduan({
        namaPelapor,
        nik,
        telepon,
        dusun,
        kategori,
        judul,
        isi,
        lampiranUrl: lampiranUrl || undefined,
      });

      if (res.success && res.data) {
        setSubmittedTicket(res.data);
        // Reset form fields
        setJudul('');
        setIsi('');
        setLampiranUrl('');
      } else {
        setFormError('Gagal mengirimkan pengaduan. Silakan coba kembali.');
      }
    } catch (err) {
      setFormError('Terjadi kesalahan koneksi server.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckTicket = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ticketInput.trim()) return;

    setChecking(true);
    setTicketError('');
    setTicketResult(null);

    try {
      const res = await onCekTiket(ticketInput);
      if (res.success && res.data) {
        setTicketResult(res.data);
      } else {
        setTicketError(res.message || 'Kode tiket pengaduan tidak ditemukan. Periksa kembali penulisan kode.');
      }
    } catch (err) {
      setTicketError('Gagal menghubungkan ke server.');
    } finally {
      setChecking(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden border border-emerald-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block bg-emerald-800 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Layanan Publik Warga
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Layanan Pengaduan & Persyaratan Surat
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Sampaikan pengaduan, kritik, dan saran pembangunan Desa Kromengan secara cepat dan terpantau, serta pelajari prosedur pengurusan berkas administrasi.
          </p>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'form'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Form Pengaduan Masyarakat</span>
        </button>

        <button
          onClick={() => setActiveTab('cek')}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'cek'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Cek Status Tiket Laporan</span>
        </button>

        <button
          onClick={() => setActiveTab('surat')}
          className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'surat'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Panduan Syarat Surat Online</span>
        </button>
      </div>

      {/* TAB 1: FORM PENGADUAN */}
      {activeTab === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Buat Laporan Pengaduan Baru</h2>
              <p className="text-xs text-gray-500 mt-1">
                Isi formulir pengaduan dengan data yang valid. Kode Tiket resmi akan diterbitkan otomatis.
              </p>
            </div>

            {submittedTicket ? (
              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-emerald-900">Pengaduan Berhasil Terkirim!</h3>
                  <p className="text-xs text-emerald-700 mt-1">
                    Laporan Anda telah berhasil dicatat oleh sistem Pemerintah Desa Kromengan.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-emerald-200 max-w-sm mx-auto shadow-inner space-y-2">
                  <p className="text-xs text-gray-500 font-medium">KODE TIKET PENGADUAN ANDA:</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-black text-emerald-800 tracking-wider">
                      {submittedTicket.kodeTiket}
                    </span>
                    <button
                      onClick={() => copyToClipboard(submittedTicket.kodeTiket)}
                      className="p-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition-colors"
                      title="Salin Kode Tiket"
                    >
                      {copiedCode ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-600">Simpan kode tiket ini untuk melacak tanggapan admin.</p>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs font-semibold">
                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                    }}
                    className="bg-emerald-700 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors"
                  >
                    Kirim Pengaduan Lainnya
                  </button>
                  <button
                    onClick={() => {
                      setTicketInput(submittedTicket.kodeTiket);
                      setActiveTab('cek');
                      handleCheckTicket();
                    }}
                    className="bg-white text-emerald-800 border border-emerald-300 px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    Pantau Tiket Ini
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {formError && (
                  <div className="bg-red-50 text-red-700 p-3.5 rounded-xl text-xs border border-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Nama Lengkap Pelapor *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Sesuai KTP"
                      value={namaPelapor}
                      onChange={(e) => setNamaPelapor(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Nomor NIK (16 Digit) *
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      required
                      placeholder="350719xxxxxxxxxx"
                      value={nik}
                      onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      No. WhatsApp / Telepon *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="0812xxxxxxxx"
                      value={telepon}
                      onChange={(e) => setTelepon(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Asal Dusun *
                    </label>
                    <select
                      value={dusun}
                      onChange={(e) => setDusun(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                    >
                      <option value="Krajan">Dusun Krajan</option>
                      <option value="Ringinanom">Dusun Ringinanom</option>
                      <option value="Balokan">Dusun Balokan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Kategori Pengaduan *
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                  >
                    <option value="Infrastruktur & Jalan">Infrastruktur & Jalan (Lampu, Aspal, Irigasi)</option>
                    <option value="Pelayanan Publik">Pelayanan Publik & Administrasi Desa</option>
                    <option value="Kebersihan & Lingkungan">Kebersihan, Sampah & Saluran Air</option>
                    <option value="Keamanan & Ketertiban">Keamanan, Ketertiban & Poskamling</option>
                    <option value="Bantuan Sosial">Bantuan Sosial (BLT, PKH, Sembako)</option>
                    <option value="Lainnya">Pengaduan / Aspirasi Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Judul Pengaduan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Lampu PJU Mati di RT 03 Dusun Krajan"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Rincian / Isi Pengaduan *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Jelaskan detail pengaduan, waktu kejadian, serta lokasi spesifik..."
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Link Foto / Dokumentasi Pendukung (Opsional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={lampiranUrl}
                    onChange={(e) => setLampiranUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Mengirimkan Pengaduan...' : 'Kirim Laporan Pengaduan'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Side Info Box */}
          <div className="lg:col-span-4 bg-emerald-950 text-white p-6 rounded-3xl space-y-4 border border-emerald-800 shadow-md">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Prinsip Layanan Pengaduan</span>
            </div>
            <ul className="space-y-3 text-xs text-emerald-200/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Kerahasiaan Data:</strong> Nomor NIK dan kontak hanya digunakan oleh tim verifikasi Pemdes untuk klarifikasi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Respon Cepat:</strong> Setiap pengaduan yang masuk akan diverifikasi dalam waktu maksimal 1x24 jam kerja.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Transparansi Status:</strong> Warga dapat memantau status secara langsung menggunakan Kode Tiket.</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-emerald-800/80">
              <p className="text-xs text-emerald-300 font-semibold mb-2">Contoh Kode Tiket Pengaduan:</p>
              <div className="bg-emerald-900 p-2.5 rounded-xl font-mono text-xs text-emerald-300 text-center">
                KRM-2026-0012
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: CEK STATUS TIKET */}
      {activeTab === 'cek' && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Lacak Status Tiket Pengaduan</h2>
            <p className="text-xs text-gray-500">
              Masukkan Kode Tiket Pengaduan yang Anda terima saat mengirimkan laporan (contoh: KRM-2026-0012)
            </p>
          </div>

          <form onSubmit={handleCheckTicket} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="Masukkan Kode Tiket (misal: KRM-2026-0012)"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono uppercase focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={checking}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>{checking ? 'Memeriksa...' : 'Cari Tiket'}</span>
            </button>
          </form>

          {ticketError && (
            <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-xs border border-amber-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{ticketError}</span>
            </div>
          )}

          {ticketResult && (
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-gray-400">KODE TIKET:</span>
                  <h3 className="text-xl font-black text-emerald-800 font-mono">
                    {ticketResult.kodeTiket}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      ticketResult.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : ticketResult.status === 'Diproses'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : ticketResult.status === 'Ditolak'
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    Status: {ticketResult.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-gray-400 font-medium">Judul Laporan:</p>
                  <p className="font-bold text-gray-900 text-sm">{ticketResult.judul}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-white p-3 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-gray-400">Nama Pelapor:</p>
                    <p className="font-semibold text-gray-800">{ticketResult.namaPelapor}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Wilayah / Kategori:</p>
                    <p className="font-semibold text-gray-800">Dusun {ticketResult.dusun} • {ticketResult.kategori}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 font-medium">Rincian Pengaduan:</p>
                  <p className="text-gray-700 bg-white p-3 rounded-xl border border-gray-100 leading-relaxed">
                    {ticketResult.isi}
                  </p>
                </div>

                {/* Response section */}
                {ticketResult.tanggapanAdmin ? (
                  <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between text-xs text-emerald-800 font-bold">
                      <span>Tanggapan Resmi Admin Pemdes Kromengan:</span>
                      <span className="text-[11px] text-emerald-600 font-normal">{ticketResult.tanggalTanggapan}</span>
                    </div>
                    <p className="text-emerald-900 text-xs leading-relaxed font-medium">
                      "{ticketResult.tanggapanAdmin}"
                    </p>
                  </div>
                ) : (
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Laporan Anda telah diterima dan sedang menunggu penanganan oleh petugas desa.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PANDUAN SURAT ONLINE */}
      {activeTab === 'surat' && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-extrabold text-gray-900">Panduan & Syarat Permohonan Surat</h2>
            <p className="text-xs text-gray-500 mt-1">
              Informasi lengkap kelengkapan berkas pelayanan administrasi di Balai Desa Kromengan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LAYANAN_SURAT_LIST.map((surat) => (
              <div
                key={surat.id}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      {surat.kode}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{surat.namaSurat}</h3>
                      <p className="text-[11px] text-emerald-700 font-medium">Estimasi: {surat.estimasiHari} Hari Kerja • {surat.biaya}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">{surat.deskripsi}</p>

                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-emerald-700" />
                    Persyaratan Berkas:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {surat.persyaratan.map((syarat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{syarat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 text-xs text-gray-500 italic">
                  * Serahkan berkas ke meja Pelayanan Publik Kantor Desa Kromengan (Senin-Jumat 08:00-15:00 WIB).
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
