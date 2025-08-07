// file: app.js

const express = require('express');
const app = express();
require('dotenv').config(); // Pastikan dotenv di-load di awal

// Import object db yang berisi semua model dan koneksi sequelize
const db = require('./models');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API Sistem Informasi Pondok Pesantren.' });
});

// Jalankan server
app.listen(PORT, async () => {
    console.log(`Server berjalan di port ${PORT}.`);
    try {
        // Autentikasi koneksi ke database
        await db.sequelize.authenticate();
        console.log('Koneksi ke database berhasil.');

        // Sinkronisasi model dengan database
        // { alter: true } akan mencoba mencocokkan tabel dengan model
        // Ini akan menambahkan kolom baru, mengubah tipe data, dll. tapi tidak akan menghapus kolom yang tidak ada di model.
        // Hati-hati menggunakan ini di produksi!
        await db.sequelize.sync({ alter: true });
        console.log('Semua model berhasil disinkronkan.');

    } catch (error) {
        console.error('Tidak dapat terhubung ke database:', error);
    }
});
