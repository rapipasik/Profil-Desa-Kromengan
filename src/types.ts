export interface BeritaItem {
  id: string;
  judul: string;
  slug?: string;
  ringkasan: string;
  konten: string;
  kategori: 'Berita' | 'Pengumuman' | 'Agenda' | 'Prestasi' | 'Kegiatan';
  penulis: string;
  tanggal: string;
  gambar: string;
  dibaca?: number;
}

export interface PotensiItem {
  id: string;
  nama: string;
  kategori: 'Pertanian & Perkebunan' | 'Peternakan' | 'UMKM & Olahan' | 'Wisata & Seni Budaya' | 'UMKM & Kuliner' | 'Pertanian' | 'Kerajinan' | 'Pariwisata';
  deskripsi: string;
  lokasi: string;
  pengelola?: string;
  pemilik?: string;
  kontak: string;
  gambar: string;
  hargaRange?: string;
  unggulan?: boolean;
}

export interface AparaturItem {
  id: string;
  nama: string;
  jabatan: string;
  nip?: string;
  dusun?: string;
  pendidikan?: string;
  foto: string;
  kontak?: string;
  urutan?: number;
}

export interface PengaduanItem {
  id: string;
  kodeTiket: string;
  namaPelapor: string;
  nik?: string;
  telepon?: string;
  kontak?: string;
  dusun: 'Krajan' | 'Ringinanom' | 'Balokan' | string;
  kategori: 'Infrastruktur & Jalan' | 'Pelayanan Publik' | 'Kebersihan & Lingkungan' | 'Keamanan & Ketertiban' | 'Bantuan Sosial' | 'Lainnya' | string;
  judul: string;
  isi?: string;
  isiPesan?: string;
  lampiranUrl?: string;
  status: 'Menunggu' | 'Diproses' | 'Selesai' | 'Ditolak';
  tanggal: string;
  tanggapanAdmin?: string;
  tanggalTanggapan?: string;
}

export interface LayananSurat {
  id: string;
  namaSurat: string;
  kode: string;
  deskripsi: string;
  persyaratan: string[];
  estimasiHari: number;
  biaya: string;
}

export interface StatistikDesa {
  totalPenduduk: number;
  jumlahLakiLaki: number;
  jumlahPerempuan: number;
  jumlahKK: number;
  jumlahDusun: number;
  luasWilayahHektar: number;
  apbdesTahun: number;
  pendapatanDesa: number;
  belanjaDesa: number;
  pendidikanStats: { tingkat: string; jumlah: number }[];
  pekerjaanStats: { jenis: string; jumlah: number }[];
  dusunStats: { namaDusun: string; jumlahPenduduk: number; jumlahKK: number }[];
}

export type StatistikData = StatistikDesa;

export type SectionType = 
  | 'beranda' 
  | 'tentang' 
  | 'potensi' 
  | 'pemerintahan' 
  | 'layanan' 
  | 'informasi' 
  | 'kontak' 
  | 'admin';

export interface AdminUser {
  username: string;
  name: string;
  role: string;
  token?: string;
}
