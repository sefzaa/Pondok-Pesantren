// file: app.js

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Impor object db yang berisi semua model dan koneksi sequelize
const db = require('./models');

// Impor objek yang berisi semua rute dari routes/index.js
const allRoutes = require('./routes');

const PORT = process.env.PORT || 3000;

// Panggil middleware cors di bagian paling atas
app.use(cors());

// Middleware untuk parsing body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- PENDAFTARAN RUTE ---
// Base route untuk health check
app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API Sistem Informasi Pondok Pesantren.' });
});

// Pendaftaran semua rute API
app.use('/api/jadwal-rutin', allRoutes.jadwalRutin);
app.use('/api/kegiatan-tambahan', allRoutes.kegiatanTambahan);

// Jalankan server
app.listen(PORT, async () => {
    console.log(`👀 Server berjalan di port ${PORT}.`);
    try {
        // Autentikasi koneksi ke database
        await db.sequelize.authenticate();
        console.log('🐳 Koneksi ke database berhasil.');

        // Sinkronisasi model dengan database
        await db.sequelize.sync({ alter: true });
        console.log('🌐 Semua model berhasil disinkronkan.');

    } catch (error) {
        console.error('🆘 Tidak dapat terhubung ke database:', error);
    }
});
