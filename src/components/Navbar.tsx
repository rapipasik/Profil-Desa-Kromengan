import React, { useState } from 'react';
import { SectionType } from '../types';
import { 
  Home, 
  Info, 
  Sprout, 
  Users, 
  FileText, 
  Newspaper, 
  PhoneCall, 
  Menu, 
  X, 
  ShieldCheck, 
  Search,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType) => void;
  onCheckTicketModal: () => void;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  onCheckTicketModal,
  isAdminLoggedIn = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda' as SectionType, label: 'Beranda', icon: Home },
    { id: 'tentang' as SectionType, label: 'Tentang Desa', icon: Info },
    { id: 'potensi' as SectionType, label: 'Potensi Desa', icon: Sprout },
    { id: 'pemerintahan' as SectionType, label: 'Pemerintahan', icon: Users },
    { id: 'layanan' as SectionType, label: 'Layanan Publik', icon: FileText },
    { id: 'informasi' as SectionType, label: 'Informasi Desa', icon: Newspaper },
    { id: 'kontak' as SectionType, label: 'Kontak Kami', icon: PhoneCall },
  ];

  const handleNavClick = (id: SectionType) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-md text-white shadow-xl border-b border-emerald-800/50">
      {/* Top emergency and notification bar */}
      <div className="bg-emerald-900/80 text-emerald-200 text-xs py-1.5 px-4 font-medium border-b border-emerald-800/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Portal Resmi Desa Kromengan - Kec. Kromengan, Kab. Malang
            </span>
            <span className="hidden md:inline-block text-emerald-700">|</span>
            <span className="hidden md:inline-block text-emerald-300/80">
              Jam Layanan: Senin - Jumat (08.00 - 15.00 WIB)
            </span>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <button
              onClick={onCheckTicketModal}
              className="flex items-center gap-1.5 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 hover:text-white px-3 py-1 rounded-full text-xs font-semibold transition-all border border-emerald-700/60 shadow-sm"
              title="Cek Status Tiket Pengaduan Masyarakat"
            >
              <Search className="w-3 h-3 text-amber-400" />
              <span>Cek Status Pengaduan</span>
            </button>
            <a
              href="tel:0341395000"
              className="hidden sm:flex items-center gap-1 text-emerald-300 hover:text-white transition-colors text-xs"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>Darurat: (0341) 395000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Village Name */}
          <div 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center space-x-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 p-0.5 shadow-lg group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center border border-emerald-400/20">
                <span className="text-lg font-black tracking-wider text-emerald-300">KM</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  DESA KROMENGAN
                </h1>
              </div>
              <p className="text-xs text-emerald-400/90 font-medium tracking-wide">
                Kecamatan Kromengan • Kabupaten Malang
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-800/90 text-white shadow-md border border-emerald-600/50'
                      : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-emerald-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {isAdminLoggedIn && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentSection === 'admin'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-slate-950 border border-amber-500/30'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-emerald-900/80 text-emerald-200 hover:text-white hover:bg-emerald-800 border border-emerald-700/50 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950/95 border-t border-emerald-800/60 px-4 pt-3 pb-6 space-y-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white border-l-4 border-amber-400 shadow-sm'
                    : 'text-emerald-200 hover:bg-emerald-900/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-emerald-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-emerald-800/60 mt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCheckTicketModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-800 text-white py-2.5 rounded-xl text-xs font-bold border border-emerald-700/60 shadow-md"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Cek Status Tiket Pengaduan</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
