import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const KontakKamiSection: React.FC = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [subjek, setSubjek] = useState('');
  const [pesan, setPesan] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nama && subjek && pesan) {
      setSentSuccess(true);
      setNama('');
      setEmail('');
      setSubjek('');
      setPesan('');
      setTimeout(() => setSentSuccess(false), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden border border-emerald-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block bg-emerald-800 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Hubungi Kami
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Kontak & Lokasi Kantor Desa Kromengan
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Silakan hubungi Sekretariat Balai Desa Kromengan melalui telepon, email, form pesan direct, atau kunjungi kantor pelayanan kami pada jam kerja resmi.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Info & Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900">Kirim Pesan Langsung</h2>
            <p className="text-xs text-gray-500 mt-1">
              Pesan Anda akan diteruskan langsung ke sekretariat layanan masyarakat Desa Kromengan.
            </p>
          </div>

          {sentSuccess && (
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-xs border border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Pesan Anda berhasil terkirim! Tim perangkat desa akan merespon secepatnya.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Alamat Email / No HP
                </label>
                <input
                  type="text"
                  placeholder="email@domain.com / 0812..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Subjek Pesan *
              </label>
              <input
                type="text"
                required
                placeholder="Perihal atau kebutuhan informasi"
                value={subjek}
                onChange={(e) => setSubjek(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Isi Pesan / Pertanyaan *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tuliskan isi pesan secara lengkap..."
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Pesan Direct</span>
            </button>
          </form>
        </div>

        {/* Right Column: Address & Map Embed */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-md space-y-4">
            <h3 className="font-bold text-lg text-emerald-300">Alamat Lengkap & Pelayanan</h3>
            
            <div className="space-y-3 text-xs text-emerald-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Kantor Kepala Desa Kromengan</p>
                  <p>Jl. Raya Kromengan No. 01, Dusun Krajan, Kec. Kromengan, Kab. Malang, Jawa Timur 65165</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(0341) 395000 / WA 0812-3456-7890</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>pemdes@kromengan.malangkab.go.id</span>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-emerald-900">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Jam Operasional Balai Desa:</p>
                  <p>Senin - Jumat: 08.00 - 15.00 WIB</p>
                  <p className="text-[11px] text-emerald-400">Sabtu & Minggu: Tutup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="bg-white p-2 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <iframe
              title="Peta Lokasi Desa Kromengan Malang"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31580.46820251703!2d112.4845!3d-8.125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78bdf1c54b5129%3A0x5027a76e3556010!2sKromengan%2C%20Malang%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="260"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
