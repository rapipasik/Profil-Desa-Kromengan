import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { 
  INITIAL_BERITA, 
  INITIAL_POTENSI, 
  INITIAL_APARATUR, 
  INITIAL_PENGADUAN, 
  INITIAL_STATISTIK 
} from './src/data/initialData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DB_FILE = path.join(__dirname, 'data_store.json');

// Memory DB initialized with fallback data or loaded from file
let db = {
  berita: [...INITIAL_BERITA],
  potensi: [...INITIAL_POTENSI],
  aparatur: [...INITIAL_APARATUR],
  pengaduan: [...INITIAL_PENGADUAN],
  statistik: { ...INITIAL_STATISTIK },
};

// Load persistent state if exists
try {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    db = JSON.parse(raw);
    console.log('[Server] Data store loaded from disk.');
  }
} catch (e) {
  console.error('[Server] Failed to load data store, using initial data:', e);
}

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (e) {
    console.error('[Server] Failed to save data store:', e);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // CORS / API headers
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // --- API ENDPOINTS ---

  // Auth API
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && (password === 'admin' || password === 'admin123')) {
      return res.json({
        success: true,
        user: {
          username: 'admin',
          name: 'Administrator Desa Kromengan',
          role: 'Super Admin',
        },
        token: 'token-kromengan-admin-session-8899',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Username atau password salah! (Gunakan Username: admin, Password: admin)',
    });
  });

  // Berita API
  app.get('/api/berita', (req, res) => {
    res.json(db.berita);
  });

  app.post('/api/berita', (req, res) => {
    const newItem = {
      id: 'b-' + Date.now(),
      slug: req.body.judul ? req.body.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'berita-baru',
      dibaca: 0,
      tanggal: new Date().toISOString().split('T')[0],
      ...req.body,
    };
    db.berita.unshift(newItem);
    saveDb();
    res.status(201).json(newItem);
  });

  app.put('/api/berita/:id', (req, res) => {
    const idx = db.berita.findIndex((item) => item.id === req.params.id);
    if (idx !== -1) {
      db.berita[idx] = { ...db.berita[idx], ...req.body };
      saveDb();
      return res.json(db.berita[idx]);
    }
    res.status(404).json({ message: 'Berita tidak ditemukan' });
  });

  app.delete('/api/berita/:id', (req, res) => {
    db.berita = db.berita.filter((item) => item.id !== req.params.id);
    saveDb();
    res.json({ success: true, id: req.params.id });
  });

  // Potensi API
  app.get('/api/potensi', (req, res) => {
    res.json(db.potensi);
  });

  app.post('/api/potensi', (req, res) => {
    const newItem = {
      id: 'p-' + Date.now(),
      ...req.body,
    };
    db.potensi.unshift(newItem);
    saveDb();
    res.status(201).json(newItem);
  });

  app.put('/api/potensi/:id', (req, res) => {
    const idx = db.potensi.findIndex((item) => item.id === req.params.id);
    if (idx !== -1) {
      db.potensi[idx] = { ...db.potensi[idx], ...req.body };
      saveDb();
      return res.json(db.potensi[idx]);
    }
    res.status(404).json({ message: 'Potensi tidak ditemukan' });
  });

  app.delete('/api/potensi/:id', (req, res) => {
    db.potensi = db.potensi.filter((item) => item.id !== req.params.id);
    saveDb();
    res.json({ success: true, id: req.params.id });
  });

  // Aparatur API
  app.get('/api/aparatur', (req, res) => {
    res.json(db.aparatur.sort((a, b) => a.urutan - b.urutan));
  });

  app.post('/api/aparatur', (req, res) => {
    const newItem = {
      id: 'ap-' + Date.now(),
      urutan: db.aparatur.length + 1,
      ...req.body,
    };
    db.aparatur.push(newItem);
    saveDb();
    res.status(201).json(newItem);
  });

  app.put('/api/aparatur/:id', (req, res) => {
    const idx = db.aparatur.findIndex((item) => item.id === req.params.id);
    if (idx !== -1) {
      db.aparatur[idx] = { ...db.aparatur[idx], ...req.body };
      saveDb();
      return res.json(db.aparatur[idx]);
    }
    res.status(404).json({ message: 'Aparatur tidak ditemukan' });
  });

  app.delete('/api/aparatur/:id', (req, res) => {
    db.aparatur = db.aparatur.filter((item) => item.id !== req.params.id);
    saveDb();
    res.json({ success: true, id: req.params.id });
  });

  // Pengaduan API
  app.get('/api/pengaduan', (req, res) => {
    res.json(db.pengaduan);
  });

  app.get('/api/pengaduan/cek/:kodeTiket', (req, res) => {
    const ticket = db.pengaduan.find(
      (item) => item.kodeTiket.toLowerCase() === req.params.kodeTiket.trim().toLowerCase()
    );
    if (ticket) {
      return res.json({ success: true, data: ticket });
    }
    res.status(404).json({ success: false, message: 'Kode tiket tidak ditemukan' });
  });

  app.post('/api/pengaduan', (req, res) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const kodeTiket = `KRM-${new Date().getFullYear()}-${randomNum}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newPengaduan = {
      id: 'pg-' + Date.now(),
      kodeTiket,
      status: 'Menunggu' as const,
      tanggal: nowStr,
      ...req.body,
    };

    db.pengaduan.unshift(newPengaduan);
    saveDb();
    res.status(201).json({ success: true, data: newPengaduan });
  });

  app.put('/api/pengaduan/:id/tanggapi', (req, res) => {
    const idx = db.pengaduan.findIndex((item) => item.id === req.params.id);
    if (idx !== -1) {
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
      db.pengaduan[idx] = {
        ...db.pengaduan[idx],
        status: req.body.status || db.pengaduan[idx].status,
        tanggapanAdmin: req.body.tanggapanAdmin,
        tanggalTanggapan: nowStr,
      };
      saveDb();
      return res.json({ success: true, data: db.pengaduan[idx] });
    }
    res.status(404).json({ success: false, message: 'Pengaduan tidak ditemukan' });
  });

  // Statistik API
  app.get('/api/statistik', (req, res) => {
    res.json(db.statistik);
  });

  app.put('/api/statistik', (req, res) => {
    db.statistik = { ...db.statistik, ...req.body };
    saveDb();
    res.json(db.statistik);
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Desa Kromengan Web running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
