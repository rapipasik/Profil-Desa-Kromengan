import React from 'react';
import { StatistikDesa } from '../types';
import { MapPin, Compass, History, Target, Users, Landmark, Trees } from 'lucide-react';

interface TentangDesaSectionProps {
  statistik: StatistikDesa;
}

export const TentangDesaSection: React.FC<TentangDesaSectionProps> = ({ statistik }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden border border-emerald-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block bg-emerald-800 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Profil Resmi Desa
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Tentang Desa Kromengan
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Mengenal lebih dekat Desa Kromengan di Kecamatan Kromengan, Kabupaten Malang — wilayah agraris yang kaya sejarah, keindahan alam, serta keberagaman budaya masyarakat Jawa.
          </p>
        </div>
      </div>

      {/* Profil & Sejarah Desa */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sejarah Box */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-emerald-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <History className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Sejarah Singkat Desa Kromengan</h2>
              <p className="text-xs text-emerald-600 font-medium">Asal-usul & Warisan Budaya Kromengan</p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed border-t border-gray-100 pt-4">
            <p>
              Nama <strong className="text-gray-900">Desa Kromengan</strong> berakar dari cerita tutur masyarakat Jawa tentang wilayah yang dipenuhi pepohonan rindang dan hamparan tanah subur di lereng perbukitan Malang Selatan. Sejak zaman babat tanah Malang, daerah ini dihuni oleh masyarakat petani yang gigih dan memegang teguh nilai kearifan lokal.
            </p>
            <p>
              Pada masa kolonial, kawasan Kromengan berkembang pesat sebagai salah satu sentra perkebunan tebu rakyat dan padi irigasi karena didukung oleh tersedianya sumber mata air alami dan aliran sungai yang melimpah dari perbukitan sekitar.
            </p>
            <p>
              Seiring berkembangnya pemekaran wilayah di Kabupaten Malang, Desa Kromengan kini menjadi pusat pemerintahan Kecamatan Kromengan, menaungi 3 dusun utama (Krajan, Ringinanom, dan Balokan) yang terus berbenah menjadi desa modern berbasis digital tanpa meninggalkan kearifan lokal budaya Jawa.
            </p>
          </div>
        </div>

        {/* Visi Misi Box */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-green-950 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-emerald-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Visi & Misi Desa</h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">VISI:</h3>
              <p className="font-semibold text-white leading-snug bg-emerald-800/60 p-3 rounded-xl border border-emerald-700/50">
                "Terwujudnya Desa Kromengan yang Maju, Sejahtera, Transparan, Berdaya Saing Agraris, dan Berkarakter Gotong Royong."
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">MISI UTAMA:</h3>
              <ul className="space-y-2 text-emerald-100/90 list-disc list-inside leading-relaxed">
                <li>Meningkatkan kualitas pelayanan administrasi desa secara digital dan transparan.</li>
                <li>Pengembangan infrastruktur pertanian tebu, padi, dan irigasi desa.</li>
                <li>Memberdayakan UMKM olahan pangan lokal serta kelompok tani dan ternak.</li>
                <li>Melestarikan nilai budaya tradisional Malang dan kerukunan warga 3 dusun (Krajan, Ringinanom, Balokan).</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Geografi & Batas Wilayah */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 text-emerald-800">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Compass className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Kondisi Geografis & Batas Wilayah</h2>
            <p className="text-xs text-emerald-600 font-medium">Letak Astronomis & Topografi Kromengan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Batas Utara</h4>
            <p className="text-sm font-semibold text-gray-900">Desa Peniwen & Kec. Ngajum</p>
          </div>

          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Batas Selatan</h4>
            <p className="text-sm font-semibold text-gray-900">Desa Slorok & Kec. Sumberpucung</p>
          </div>

          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Batas Timur</h4>
            <p className="text-sm font-semibold text-gray-900">Desa Jatikerto / Kepanjen</p>
          </div>

          <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Batas Barat</h4>
            <p className="text-sm font-semibold text-gray-900">Desa Jambuwer & Karangkates</p>
          </div>

        </div>

        {/* Orbitasi & Jarak */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-gray-500">Jarak ke Ibu Kota Kecamatan</p>
              <p className="font-bold text-gray-900">± 1,5 km (5 Menit)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-gray-500">Jarak ke Ibu Kota Kabupaten (Kepanjen)</p>
              <p className="font-bold text-gray-900">± 22 km (35 Menit)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-gray-500">Jarak ke Kota Malang</p>
              <p className="font-bold text-gray-900">± 32 km (50 Menit)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demografi 4 Dusun */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pembagian Wilayah Dusun</h2>
            <p className="text-xs text-gray-500">3 Dusun di bawah Naungan Desa Kromengan (Krajan, Ringinanom, Balokan)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistik.dusunStats.map((dusun, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm mb-4">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">{dusun.namaDusun}</h3>
              <p className="text-xs text-emerald-600 font-medium mb-4">Wilayah Pemukiman & Pertanian</p>
              <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Jumlah Penduduk:</span>
                  <span className="font-bold text-gray-900">{dusun.jumlahPenduduk.toLocaleString('id-ID')} Jiwa</span>
                </div>
                <div className="flex justify-between">
                  <span>Jumlah KK:</span>
                  <span className="font-bold text-gray-900">{dusun.jumlahKK.toLocaleString('id-ID')} KK</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
