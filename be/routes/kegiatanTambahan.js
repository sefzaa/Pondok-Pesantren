// routes/kegiatanTambahan.js

const express = require("express");
const { create, findAll, update, destroy } = require("../controllers/kegiatanTambahan.js");
const router = express.Router();

// Endpoint untuk membuat kegiatan tambahan baru
router.post("/create", create);

// Endpoint untuk mengambil semua kegiatan tambahan
router.get("/", findAll);

// Endpoint untuk mengupdate kegiatan tambahan berdasarkan id
router.put("/:id", update);

// Endpoint untuk menghapus kegiatan tambahan berdasarkan id
router.delete("/:id", destroy);

module.exports = router;
