// routes/index.js

// Impor semua file rute yang ada
const jadwalRutinRoutes = require("./jadwalRutin.js");
const kegiatanTambahanRoutes = require("./kegiatanTambahan.js"); // <-- INI YANG BARU

// Buat objek untuk menampung semua rute
const router = {};

// Daftarkan setiap rute ke dalam objek
router.jadwalRutin = jadwalRutinRoutes;
router.kegiatanTambahan = kegiatanTambahanRoutes; // <-- INI YANG BARU

// Ekspor objek yang berisi semua rute
module.exports = router;
