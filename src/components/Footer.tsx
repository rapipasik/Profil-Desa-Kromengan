import React from 'react';
import { SectionType } from '../types';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: SectionType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-emerald-900/40 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-radial from-emerald-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-black text-lg shadow-lg border border-emerald-400/30">
                KM
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight leading-tight">
                  PEMERINTAH DESA KROMENGAN
                </h3>
                <p className="text-xs text-emerald-400 font-medium">Kabupaten Malang, Jawa Timur</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Portal informasi resmi Desa Kromengan. Mewujudkan pelayanan publik yang cepat, transparan, akuntabel, dan memberdayakan potensi lokal demi kemajuan bersama.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Website Resmi Terverifikasi</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-bold text-white text-xs mb-4 border-b border-slate-800 pb-2 uppercase tracking-wider">
              Menu Utama
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('beranda')} className="hover:text-emerald-400 transition-colors">
                  • Beranda
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tentang')} className="hover:text-emerald-400 transition-colors">
                  • Tentang & Profil Desa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('potensi')} className="hover:text-emerald-400 transition-colors">
                  • Potensi Pertanian & UMKM
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pemerintahan')} className="hover:text-emerald-400 transition-colors">
                  • Aparatur & Struktur Desa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('layanan')} className="hover:text-emerald-400 transition-colors">
                  • Pengaduan & Layanan Surat
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('informasi')} className="hover:text-emerald-400 transition-colors">
                  • Berita & Transparansi APBDes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Dusun & Wilayah */}
          <div>
            <h4 className="font-bold text-white text-xs mb-4 border-b border-slate-800 pb-2 uppercase tracking-wider">
              Wilayah Dusun
            </h4>
            <p className="text-xs text-slate-400 mb-3 font-medium">
              Desa Kromengan menaungi 3 dusun utama:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Dusun Krajan (Pusat Pemerintahan)</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Dusun Ringinanom</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Dusun Balokan</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h4 className="font-bold text-white text-xs mb-4 border-b border-slate-800 pb-2 uppercase tracking-wider">
              Kontak Balai Desa
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Jl. Raya Kromengan No. 01, Dusun Krajan, Kec. Kromengan, Kab. Malang, Jawa Timur 65165
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(0341) 395000 / WA 0812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>pemdes@kromengan.malangkab.go.id</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} Pemerintah Desa Kromengan, Kecamatan Kromengan, Kabupaten Malang.
            </p>
            <p className="text-[11px] text-emerald-400 font-medium">
              Dikembangkan oleh <span className="font-bold text-emerald-300">KKN Kelompok 191 Universitas Muhammadiyah Malang (UMM) Tahun 2026</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-medium shrink-0">
            <span>Dikelola dengan semangat gotong royong & pengabdian</span>
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
