import { BeritaItem, PotensiItem, AparaturItem, PengaduanItem, LayananSurat, StatistikDesa } from '../types';

export const INITIAL_BERITA: BeritaItem[] = [
  {
    id: 'b-1',
    judul: 'Pemerintah Desa Kromengan Gelar Musrenbangdes 2026 untuk Penetapan Rencana Pembangunan',
    slug: 'musrenbangdes-kromengan-2026',
    ringkasan: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Desa Kromengan sukses dilaksanakan dengan fokus pada perbaikan irigasi sawah dan digitalisasi UMKM.',
    konten: `Pemerintah Desa Kromengan, Kecamatan Kromengan, Kabupaten Malang menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Rencana Kerja Pemerintah Desa (RKPDes) Tahun Anggaran 2026 yang bertempat di Pendopo Balai Desa Kromengan.\n\nAcara tersebut dihadiri oleh Camat Kromengan, Kepala Desa Kromengan, Perangkat Desa, Badan Permusyawaratan Desa (BPD), Ketua RT/RW, tokoh masyarakat, serta perwakilan kelompok tani dan ibu-ibu PKK.\n\nFokus utama pembangunan Desa Kromengan untuk tahun mendatang meliputi peningkatan jaringan irigasi tersier untuk lahan tebu dan padi, pembenahan jalan usaha tani di Dusun Krajan, Dusun Ringinanom, dan Dusun Balokan, serta program bantuan modal usaha digital bagi UMKM olahan pangan lokal.`,
    kategori: 'Berita',
    penulis: 'Sekretariat Desa Kromengan',
    tanggal: '2026-07-28',
    gambar: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    dibaca: 342,
  },
  {
    id: 'b-2',
    judul: 'Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap III Tahun 2026',
    slug: 'penyaluran-blt-dana-desa-tahap-3',
    ringkasan: 'Sebanyak 85 Keluarga Penerima Manfaat (KPM) di Desa Kromengan menerima penyaluran BLT Dana Desa periode Juli-September 2026.',
    konten: `Pemerintah Desa Kromengan telah menyalurkan Bantuan Langsung Tunai (BLT) Dana Desa Tahap III di Aula Kantor Desa Kromengan. Penyaluran ini diperuntukkan bagi lansia, warga kurang mampu, serta warga berpenyakit menahun di 3 dusun (Krajan, Ringinanom, Balokan).\n\nKepala Desa menyampaikan harapan agar bantuan tunai ini dimanfaatkan secara bijak untuk memenuhi kebutuhan pokok pangan sehari-hari serta kesehatan keluarga.`,
    kategori: 'Pengumuman',
    penulis: 'Kaur Keuangan Desa',
    tanggal: '2026-07-20',
    gambar: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    dibaca: 512,
  },
  {
    id: 'b-3',
    judul: 'Kerja Bakti Masal Membersihkan Saluran Irigasi Sawah Sambut Musim Tanam Padi',
    slug: 'kerja-bakti-irigasi-sawah-kromengan',
    ringkasan: 'Warga Dusun Ringinanom dan Balokan antusias gotong royong membersihkan selokan irigasi sepanjang 1,5 km.',
    konten: `Menyambut datangnya musim tanam padi, para petani tergabung dalam Kelompok Tani Tani Makmur Desa Kromengan melakukan kerja bakti pembersihan saluran irigasi utama di Dusun Ringinanom dan Balokan.\n\nGotong royong yang menjadi tradisi leluhur Desa Kromengan ini bertujuan memastikan kelancaran suplai air dari DAM irigasi menuju sawah-sawah warga.`,
    kategori: 'Agenda',
    penulis: 'Kasi Pembangunan',
    tanggal: '2026-07-15',
    gambar: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    dibaca: 289,
  },
  {
    id: 'b-4',
    judul: 'UMKM Keripik Singkong & Tempe Desa Kromengan Tembus Pasar Swalayan Malang Raya',
    slug: 'umkm-keripik-kromengan-pasar-malang',
    ringkasan: 'Produk olahan pangan khas Desa Kromengan kini telah mengantongi sertifikasi halal dan izin P-IRT resmi.',
    konten: `Keberhasilan kelompok UMKM Srikandi Mandiri Desa Kromengan patut diacungi jempol. Produk olahan keripik singkong pedas manis dan tempe renyah khas Kromengan kini resmi didistribusikan ke pusat oleh-oleh di Malang Raya.\n\nPemerintah Desa memberikan pembinaan berlanjut berupa kemasan vakum modern dan fasilitasi pendaftaran Hak Merek.`,
    kategori: 'Prestasi',
    penulis: 'Pemberdayaan Masyarakat',
    tanggal: '2026-07-02',
    gambar: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
    dibaca: 620,
  }
];

export const INITIAL_POTENSI: PotensiItem[] = [
  {
    id: 'p-1',
    nama: 'Sentra Komoditas Tebu & Padi Organik Kromengan',
    kategori: 'Pertanian & Perkebunan',
    deskripsi: 'Desa Kromengan memiliki hamparan tanah subur seluas lebih dari 450 hektar yang menjadi pemasok utama tebu untuk Pabrik Gula di Kabupaten Malang serta padi segar berkualitas tinggi.',
    lokasi: 'Dusun Krajan & Dusun Ringinanom, Desa Kromengan',
    pengelola: 'Gapoktan Tani Makmur Kromengan',
    kontak: '0812-3456-7890',
    gambar: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    unggulan: true
  },
  {
    id: 'p-2',
    nama: 'UMKM Keripik Singkong & Tempe Srikandi',
    kategori: 'UMKM & Olahan',
    deskripsi: 'Olahan tradisional renyah dengan bumbu rempah alami khas Malang tanpa bahan pengawet. Tersedia aneka rasa balado, keju, pedas manis, dan original.',
    lokasi: 'Dusun Ringinanom RT 04 RW 02',
    pengelola: 'Ibu Ningsih & Kelompok PKK Desa',
    kontak: '0857-8901-2345',
    gambar: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
    unggulan: true
  },
  {
    id: 'p-3',
    nama: 'Peternakan Sapi Perah & Kambing Etawa',
    kategori: 'Peternakan',
    deskripsi: 'Peternakan terpadu yang menghasilkan susu sapi murni harian dan pembiakan kambing etawa dengan pengelolaan pakan hijau organik.',
    lokasi: 'Dusun Balokan, Desa Kromengan',
    pengelola: 'Kelompok Ternak Lembu Jaya',
    kontak: '0821-6543-9876',
    gambar: 'https://images.unsplash.com/photo-1527153857715-3904f140d1f3?auto=format&fit=crop&w=800&q=80',
    unggulan: false
  },
  {
    id: 'p-4',
    nama: 'Seni Karawitan & Sanggar Tari Kesenian Malang',
    kategori: 'Wisata & Seni Budaya',
    deskripsi: 'Pelestarian seni budaya tradisional Jawa dan tari khas Malang yang diwariskan turun-temurun, rutin mengisi acara sedekah bumi dan festival seni kabupaten.',
    lokasi: 'Pendopo Sanggar Budaya Dusun Krajan',
    pengelola: 'Paguyuban Seni Laras Kromengan',
    kontak: '0813-9876-5432',
    gambar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    unggulan: true
  }
];

export const INITIAL_APARATUR: AparaturItem[] = [
  {
    id: 'ap-1',
    nama: 'Bpk. H. Sukadi, S.Sos.',
    jabatan: 'Kepala Desa Kromengan',
    nip: '19720412 199803 1 004',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    kontak: '0812-3344-5566',
    urutan: 1
  },
  {
    id: 'ap-2',
    nama: 'Bpk. Sugeng Waluyo, S.AP.',
    jabatan: 'Sekretaris Desa (Sekdes)',
    nip: '19780915 200501 1 009',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    kontak: '0813-4455-6677',
    urutan: 2
  },
  {
    id: 'ap-3',
    nama: 'Ibu Ratna Purwanti, S.E.',
    jabatan: 'Kaur Keuangan',
    nip: '19831102 201002 2 015',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    kontak: '0815-5566-7788',
    urutan: 3
  },
  {
    id: 'ap-4',
    nama: 'Bpk. Bambang Utomo',
    jabatan: 'Kasun Krajan',
    dusun: 'Krajan',
    nip: '19800520 200804 1 003',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    kontak: '0821-7788-9900',
    urutan: 4
  },
  {
    id: 'ap-5',
    nama: 'Bpk. Ahmad Fauzi',
    jabatan: 'Kasun Ringinanom',
    dusun: 'Ringinanom',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    kontak: '0856-1122-3344',
    urutan: 5
  },
  {
    id: 'ap-6',
    nama: 'Bpk. Supriyadi',
    jabatan: 'Kasun Balokan',
    dusun: 'Balokan',
    foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    kontak: '0857-2233-4455',
    urutan: 6
  }
];

export const INITIAL_PENGADUAN: PengaduanItem[] = [
  {
    id: 'pg-1',
    kodeTiket: 'KRM-2026-0012',
    namaPelapor: 'Rahmat Hidayat',
    nik: '3507192304890001',
    telepon: '0812-9988-7766',
    dusun: 'Krajan',
    kategori: 'Infrastruktur & Jalan',
    judul: 'Lampu Penerangan Jalan Umum (PJU) Mati di Jalan Raya RT 03 Dusun Krajan',
    isi: 'Sudah 5 hari lampu PJU di dekat persimpangan RT 03 Krajan padam, mohon perbaikan demi keamanan warga yang lewat malam hari.',
    status: 'Diproses',
    tanggal: '2026-07-26 14:30',
    tanggapanAdmin: 'Terima kasih atas laporannya. Petugas teknis PJU desa sudah dijadwalkan untuk pengecekan dan penggantian bohlam pada hari Jumat ini.',
    tanggalTanggapan: '2026-07-27 09:15'
  },
  {
    id: 'pg-2',
    kodeTiket: 'KRM-2026-0015',
    namaPelapor: 'Siti Aminah',
    nik: '3507195410920003',
    telepon: '0857-3322-1100',
    dusun: 'Ringinanom',
    kategori: 'Kebersihan & Lingkungan',
    judul: 'Pembersihan Tumpukan Sampah di Dekat Batas Dusun Ringinanom',
    isi: 'Ada tumpukan sampah liar di pinggir sungai kecil dekat jembatan Dusun Ringinanom. Mohon dipasang papan larangan membuang sampah dan dibersihkan.',
    status: 'Selesai',
    tanggal: '2026-07-21 10:15',
    tanggapanAdmin: 'Sampah telah dibersihkan bersama tim Karang Taruna pada 23 Juli 2026 dan lokasi telah dipasangi papan himbauan kebersihan lingkungan.',
    tanggalTanggapan: '2026-07-24 16:00'
  },
  {
    id: 'pg-3',
    kodeTiket: 'KRM-2026-0019',
    namaPelapor: 'Budi Santoso',
    nik: '3507191108850002',
    telepon: '0813-7766-5544',
    dusun: 'Balokan',
    kategori: 'Pelayanan Publik',
    judul: 'Informasi Syarat Pengurusan Surat Keterangan Usaha (SKU) untuk Bank',
    isi: 'Mohon petunjuk berkas apa saja yang harus disiapkan sebelum datang ke kantor desa untuk membuat Surat Keterangan Usaha.',
    status: 'Selesai',
    tanggal: '2026-07-29 08:45',
    tanggapanAdmin: 'Persyaratan SKU meliputi: Fotokopi KTP, KK, Surat Pengantar RT/RW, dan foto tempat usaha. Silakan datang pada jam layanan kerja 08:00 - 15:00 WIB.',
    tanggalTanggapan: '2026-07-29 11:20'
  }
];

export const LAYANAN_SURAT_LIST: LayananSurat[] = [
  {
    id: 'ls-1',
    namaSurat: 'Surat Keterangan Usaha (SKU)',
    kode: 'SKU-01',
    deskripsi: 'Digunakan sebagai bukti kepemilikan usaha untuk pengajuan KUR, perizinan, atau kemitraan.',
    persyaratan: [
      'Surat Pengantar RT/RW setempat',
      'Fotokopi KTP Pemohon (Malang)',
      'Fotokopi Kartu Keluarga (KK)',
      'Foto Lokasi / Kegiatan Usaha'
    ],
    estimasiHari: 1,
    biaya: 'Gratis (Rp 0)'
  },
  {
    id: 'ls-2',
    namaSurat: 'Surat Keterangan Tidak Mampu (SKTM)',
    kode: 'SKTM-02',
    deskripsi: 'Persyaratan pengajuan beasiswa pendidikan, KIS/BPJS Kesehatan PBI, atau bantuan biaya rumah sakit.',
    persyaratan: [
      'Surat Pengantar RT/RW (Menyatakan Kurang Mampu)',
      'Fotokopi KTP & KK Pemohon',
      'Fotokopi Kartu Indonesia Sehat / BPJS (Jika Ada)',
      'Foto Rumah Tampak Depan'
    ],
    estimasiHari: 1,
    biaya: 'Gratis (Rp 0)'
  },
  {
    id: 'ls-3',
    namaSurat: 'Surat Keterangan Domisili Warga / Usaha',
    kode: 'SKD-03',
    deskripsi: 'Surat keterangan bukti bertempat tinggal atau lokasi kantor/badan usaha di wilayah Desa Kromengan.',
    persyaratan: [
      'Surat Pengantar RT/RW',
      'Fotokopi KTP & KK',
      'Bukti Kepemilikan Tempat / Sewa (Untuk Usaha)'
    ],
    estimasiHari: 1,
    biaya: 'Gratis (Rp 0)'
  },
  {
    id: 'ls-4',
    namaSurat: 'Surat Pengantar SKCK / Kelakuan Baik',
    kode: 'SKCK-04',
    deskripsi: 'Surat rekomendasi desa untuk pembuatan SKCK di Polsek Kecamatan Kromengan.',
    persyaratan: [
      'Surat Pengantar RT/RW',
      'Fotokopi KTP & KK',
      'Pas Foto 4x6 Latar Merah (2 Lembar)'
    ],
    estimasiHari: 1,
    biaya: 'Gratis (Rp 0)'
  }
];

export const INITIAL_STATISTIK: StatistikDesa = {
  totalPenduduk: 6485,
  jumlahLakiLaki: 3210,
  jumlahPerempuan: 3275,
  jumlahKK: 1980,
  jumlahDusun: 3,
  luasWilayahHektar: 685,
  apbdesTahun: 2026,
  pendapatanDesa: 1850000000,
  belanjaDesa: 1810000000,
  pendidikanStats: [
    { tingkat: 'SD / Sederajat', jumlah: 1850 },
    { tingkat: 'SMP / Sederajat', jumlah: 1620 },
    { tingkat: 'SMA / SMK', jumlah: 1940 },
    { tingkat: 'Diploma / Sarjana', jumlah: 650 },
    { tingkat: 'Belum / Tidak Sekolah', jumlah: 425 }
  ],
  pekerjaanStats: [
    { jenis: 'Petani & Perkebunan', jumlah: 2450 },
    { jenis: 'Wiraswasta / UMKM', jumlah: 1120 },
    { jenis: 'Karyawan Swasta', jumlah: 980 },
    { jenis: 'Buruh Harian Lepas', jumlah: 850 },
    { jenis: 'PNS / TNI / Polri', jumlah: 145 },
    { jenis: 'Lainnya / IRT / Pelajar', jumlah: 940 }
  ],
  dusunStats: [
    { namaDusun: 'Dusun Krajan', jumlahPenduduk: 2450, jumlahKK: 720 },
    { namaDusun: 'Dusun Ringinanom', jumlahPenduduk: 2180, jumlahKK: 650 },
    { namaDusun: 'Dusun Balokan', jumlahPenduduk: 1855, jumlahKK: 610 }
  ]
};

