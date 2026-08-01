import React, { useState } from 'react';
import { PengaduanItem } from '../types';
import { Search, X, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface CheckTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCekTiket: (kode: string) => Promise<{ success: boolean; data?: PengaduanItem; message?: string }>;
}

export const CheckTicketModal: React.FC<CheckTicketModalProps> = ({
  isOpen,
  onClose,
  onCekTiket
}) => {
  const [ticketInput, setTicketInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PengaduanItem | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const res = await onCekTiket(ticketInput);
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        setErrorMsg(res.message || 'Kode tiket tidak ditemukan dalam sistem.');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server database desa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-600" />
            <span>Cek Status Tiket Pengaduan</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Masukkan kode tiket laporan Anda (contoh: <strong className="font-mono text-emerald-700">KRM-2026-0012</strong>)
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            required
            placeholder="Kode Tiket..."
            value={ticketInput}
            onChange={(e) => setTicketInput(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono uppercase focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50 shrink-0"
          >
            <span>{loading ? 'Cek...' : 'Lacak'}</span>
          </button>
        </form>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {result && (
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-emerald-200/60 pb-2">
              <span className="font-mono font-bold text-emerald-900 text-sm">{result.kodeTiket}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  result.status === 'Selesai'
                    ? 'bg-emerald-200 text-emerald-900'
                    : result.status === 'Diproses'
                    ? 'bg-blue-200 text-blue-900'
                    : result.status === 'Ditolak'
                    ? 'bg-red-200 text-red-900'
                    : 'bg-amber-200 text-amber-900'
                }`}
              >
                {result.status}
              </span>
            </div>

            <div>
              <p className="text-gray-500">Judul Pengaduan:</p>
              <p className="font-bold text-gray-900 mt-0.5">{result.judul}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <p className="text-gray-400">Pelapor:</p>
                <p className="font-medium text-gray-800">{result.namaPelapor}</p>
              </div>
              <div>
                <p className="text-gray-400">Dusun:</p>
                <p className="font-medium text-gray-800">Dusun {result.dusun}</p>
              </div>
            </div>

            {result.tanggapanAdmin ? (
              <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-1">
                <p className="font-bold text-emerald-800 text-[11px]">Tanggapan Pemdes Kromengan:</p>
                <p className="text-gray-700 text-xs">"{result.tanggapanAdmin}"</p>
                <p className="text-[10px] text-gray-400 pt-1">{result.tanggalTanggapan}</p>
              </div>
            ) : (
              <div className="bg-amber-100/70 p-2.5 rounded-xl text-[11px] text-amber-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Pengaduan sedang dalam proses verifikasi oleh perangkat desa.</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
