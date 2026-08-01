import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { BerandaSection } from './components/BerandaSection';
import { TentangDesaSection } from './components/TentangDesaSection';
import { PemerintahanDesaSection } from './components/PemerintahanDesaSection';
import { LayananPublikSection } from './components/LayananPublikSection';
import { PotensiDesaSection } from './components/PotensiDesaSection';
import { InformasiDesaSection } from './components/InformasiDesaSection';
import { KontakKamiSection } from './components/KontakKamiSection';

import { CheckTicketModal } from './components/CheckTicketModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardSection } from './components/AdminDashboardSection';

import {
  INITIAL_BERITA,
  INITIAL_POTENSI,
  INITIAL_APARATUR,
  INITIAL_PENGADUAN,
  INITIAL_STATISTIK
} from './data/initialData';

import {
  BeritaItem,
  PotensiItem,
  AparaturItem,
  PengaduanItem,
  StatistikDesa,
  SectionType
} from './types';

export default function App() {
  // Navigation Section State
  const [activeSection, setActiveSection] = useState<SectionType>('beranda');

  // Application Dynamic State
  const [beritaList, setBeritaList] = useState<BeritaItem[]>(INITIAL_BERITA);
  const [potensiList, setPotensiList] = useState<PotensiItem[]>(INITIAL_POTENSI);
  const [aparaturList, setAparaturList] = useState<AparaturItem[]>(INITIAL_APARATUR);
  const [pengaduanList, setPengaduanList] = useState<PengaduanItem[]>(INITIAL_PENGADUAN);
  const [statistik, setStatistik] = useState<StatistikDesa>(INITIAL_STATISTIK);

  // Modals
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Dynamic document title update based on section
  useEffect(() => {
    const sectionTitles: Record<SectionType, string> = {
      beranda: 'Desa Kromengan | Beranda',
      tentang: 'Desa Kromengan | Tentang Kami',
      pemerintahan: 'Desa Kromengan | Pemerintahan Desa',
      layanan: 'Desa Kromengan | Layanan Publik',
      potensi: 'Desa Kromengan | Potensi Desa',
      informasi: 'Desa Kromengan | Informasi Desa',
      kontak: 'Desa Kromengan | Kontak Kami',
      admin: 'Desa Kromengan | Admin Dashboard',
    };
    document.title = sectionTitles[activeSection] || 'Desa Kromengan | Kabupaten Malang';
  }, [activeSection]);

  // Hash route listener for secret `#admin` or `#/admin` URL access
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#/admin') {
        if (!isAdminLoggedIn) {
          setIsAdminLoginOpen(true);
        } else {
          setActiveSection('admin');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminLoggedIn]);

  // Submit Pengaduan from Public Layanan Section
  const handleAddPengaduan = async (data: Partial<PengaduanItem>) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const kodeTiket = `KRM-2026-${randomNum}`;
    const newPengaduan: PengaduanItem = {
      id: `pg-${Date.now()}`,
      kodeTiket,
      namaPelapor: data.namaPelapor || 'Warga Desa',
      nik: data.nik || '',
      telepon: data.telepon || '',
      dusun: (data.dusun as any) || 'Krajan',
      kategori: (data.kategori as any) || 'Pelayanan Publik',
      judul: data.judul || 'Laporan Pengaduan',
      isi: data.isi || '',
      isiPesan: data.isi || '',
      status: 'Menunggu',
      tanggal: new Date().toISOString().slice(0, 10) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setPengaduanList((prev) => [newPengaduan, ...prev]);
    return { success: true, data: newPengaduan };
  };

  // Check Ticket Code Status
  const handleCekTiket = async (kode: string) => {
    const cleanKode = kode.trim().toUpperCase();
    const found = pengaduanList.find(
      (p) => p.kodeTiket.toUpperCase() === cleanKode || p.id.toUpperCase() === cleanKode
    );

    if (found) {
      return { success: true, data: found };
    } else {
      return { success: false, message: 'Kode tiket pengaduan tidak ditemukan. Silakan periksa kembali.' };
    }
  };

  // Admin Actions
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminLoginOpen(false);
    setActiveSection('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setActiveSection('beranda');
    window.location.hash = '';
  };

  const handleUpdatePengaduanStatus = (id: string, status: PengaduanItem['status'], tanggapan?: string) => {
    setPengaduanList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              tanggapanAdmin: tanggapan,
              tanggalTanggapan: new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })
            }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Primary Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={(sec) => {
          if (sec === 'admin') {
            if (isAdminLoggedIn) {
              setActiveSection('admin');
            } else {
              setIsAdminLoginOpen(true);
            }
          } else {
            setActiveSection(sec);
          }
        }}
        onCheckTicketModal={() => setIsTicketModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeSection === 'beranda' && (
          <BerandaSection
            onNavigate={setActiveSection}
            onCheckTicketModal={() => setIsTicketModalOpen(true)}
            beritaList={beritaList}
            potensiList={potensiList}
            statistik={statistik}
          />
        )}

        {activeSection === 'tentang' && <TentangDesaSection statistik={statistik} />}

        {activeSection === 'pemerintahan' && <PemerintahanDesaSection aparaturList={aparaturList} />}

        {activeSection === 'layanan' && (
          <LayananPublikSection
            onAddPengaduan={handleAddPengaduan}
            onCekTiket={handleCekTiket}
          />
        )}

        {activeSection === 'potensi' && <PotensiDesaSection potensiList={potensiList} />}

        {activeSection === 'informasi' && (
          <InformasiDesaSection beritaList={beritaList} statistik={statistik} />
        )}

        {activeSection === 'kontak' && <KontakKamiSection />}

        {activeSection === 'admin' && isAdminLoggedIn && (
          <AdminDashboardSection
            onLogout={handleAdminLogout}
            beritaList={beritaList}
            potensiList={potensiList}
            aparaturList={aparaturList}
            pengaduanList={pengaduanList}
            statistik={statistik}
            onUpdateBerita={setBeritaList}
            onUpdatePotensi={setPotensiList}
            onUpdateAparatur={setAparaturList}
            onUpdatePengaduanStatus={handleUpdatePengaduanStatus}
            onUpdateStatistik={setStatistik}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setActiveSection}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Check Ticket Code Search Modal */}
      <CheckTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onCekTiket={handleCekTiket}
      />

      {/* Admin Login Modal (Secret access via /#admin or hidden link in footer) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

    </div>
  );
}
