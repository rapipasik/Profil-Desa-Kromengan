import React from 'react';
import { AparaturItem } from '../types';
import { Users, Phone, Shield, Award, ChevronRight, Building } from 'lucide-react';

interface PemerintahanDesaSectionProps {
  aparaturList: AparaturItem[];
}

export const PemerintahanDesaSection: React.FC<PemerintahanDesaSectionProps> = ({ aparaturList }) => {
  const kades = aparaturList.find(a => a.jabatan.includes('Kepala Desa')) || aparaturList[0];
  const sekdes = aparaturList.find(a => a.jabatan.includes('Sekretaris')) || aparaturList[1];
  const staffLainnya = aparaturList.filter(a => a.id !== kades?.id && a.id !== sekdes?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden border border-emerald-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block bg-emerald-800 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Struktur & Organisasi
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Pemerintahan Desa Kromengan
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Mengenal jajaran Aparatur Pemerintah Desa, Badan Permusyawaratan Desa (BPD), serta Lembaga Kemasyarakatan yang siap memberikan pelayanan terbaik bagi warga.
          </p>
        </div>
      </div>

      {/* Top Leadership Hierarchy (Kades & Sekdes) */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-1">
            Pimpinan Utama
          </h2>
          <p className="text-2xl font-extrabold text-gray-900">
            Kepala Desa & Sekretaris Desa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Kades Card */}
          {kades && (
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500/30 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row items-center gap-6">
              <img
                src={kades.foto}
                alt={kades.nama}
                className="w-28 h-28 rounded-2xl object-cover shadow-md border-2 border-emerald-600 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2 text-center sm:text-left">
                <span className="bg-emerald-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {kades.jabatan}
                </span>
                <h3 className="font-bold text-gray-900 text-lg leading-snug">{kades.nama}</h3>
                {kades.nip && <p className="text-xs text-gray-500">NIP: {kades.nip}</p>}
                <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center sm:justify-start gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {kades.kontak}
                </p>
              </div>
            </div>
          )}

          {/* Sekdes Card */}
          {sekdes && (
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500/30 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row items-center gap-6">
              <img
                src={sekdes.foto}
                alt={sekdes.nama}
                className="w-28 h-28 rounded-2xl object-cover shadow-md border-2 border-emerald-600 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2 text-center sm:text-left">
                <span className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {sekdes.jabatan}
                </span>
                <h3 className="font-bold text-gray-900 text-lg leading-snug">{sekdes.nama}</h3>
                {sekdes.nip && <p className="text-xs text-gray-500">NIP: {sekdes.nip}</p>}
                <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center sm:justify-start gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {sekdes.kontak}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Grid Perangkat & Kepala Dusun */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Perangkat Desa & Kepala Dusun</h2>
            <p className="text-xs text-gray-500">Kaur, Kasi, dan Kepala Wilayah Dusun Kromengan</p>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            {staffLainnya.length + 2} Anggota Pemdes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {staffLainnya.map((staff) => (
            <div
              key={staff.id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-3"
            >
              <img
                src={staff.foto}
                alt={staff.nama}
                className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {staff.jabatan}
                </span>
                <h4 className="font-bold text-gray-900 text-sm mt-2">{staff.nama}</h4>
                {staff.dusun && (
                  <p className="text-xs text-emerald-600 font-medium">Wilayah: Dusun {staff.dusun}</p>
                )}
                {staff.nip && <p className="text-[11px] text-gray-400 mt-1">NIP: {staff.nip}</p>}
              </div>
              <div className="pt-2 border-t border-gray-100 w-full text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>{staff.kontak}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lembaga Desa Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 text-emerald-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Building className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Lembaga Kemasyarakatan Desa (LKD)</h2>
            <p className="text-xs text-emerald-600 font-medium">Mitra Kerja Pemerintah Desa Kromengan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 space-y-2">
            <h4 className="font-bold text-emerald-900 text-base">BPD (Badan Permusyawaratan Desa)</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Lembaga perwujudan demokrasi dalam penyelenggaraan pemerintah desa. Menampung dan menyalurkan aspirasi masyarakat Desa Kromengan.
            </p>
            <p className="text-xs font-semibold text-emerald-700 pt-2">Ketua: Bpk. Drs. H. Kasiyanto</p>
          </div>

          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 space-y-2">
            <h4 className="font-bold text-emerald-900 text-base">LPMD & TP PKK Desa</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Wadah pemberdayaan masyarakat dan gerakan perempuan dalam menyukseskan program kesehatan ibu-anak, stunting, dan ekonomi keluarga.
            </p>
            <p className="text-xs font-semibold text-emerald-700 pt-2">Ketua PKK: Hj. Siti Rahmah</p>
          </div>

          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 space-y-2">
            <h4 className="font-bold text-emerald-900 text-base">Karang Taruna Tunas Muda</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Organisasi pemuda desa yang bergerak di bidang kegiatan sosial, olah raga, kesenian tradisi Malang, serta pelatihan kewirausahaan muda.
            </p>
            <p className="text-xs font-semibold text-emerald-700 pt-2">Ketua: Ahmad Rizal, S.T.</p>
          </div>

        </div>
      </div>

    </div>
  );
};
