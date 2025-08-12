// routes/jadwalRutin.routes.js

const express = require("express");
// Impor fungsi controller secara destrukturisasi
const { create, findAll, update, destroy } = require("../controllers/jadwalRutin.js");
const router = express.Router();

// Mendefinisikan endpoint pada router
// Metode POST untuk membuat data baru
router.post("/create", create);

// Metode GET untuk mengambil semua data
router.get("/", findAll);

// Metode PUT untuk mengupdate data berdasarkan ID
router.put("/:id", update);

// Metode DELETE untuk menghapus data berdasarkan ID
router.delete("/:id", destroy);

// Ekspor instance router agar bisa digunakan di file lain
module.exports = router;
