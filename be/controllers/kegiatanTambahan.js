// controllers/kegiatanTambahan.js

const db = require('../models');
const Kegiatan = db.Kegiatan; // Menggunakan model Kegiatan

// Membuat dan menyimpan kegiatan tambahan baru
const create = (req, res) => {
    // Validasi request
    if (!req.body.name || !req.body.date) {
        return res.status(400).send({
            message: "Nama kegiatan dan tanggal tidak boleh kosong!"
        });
    }

    // Buat objek kegiatan dari request
    const kegiatan = {
        nama: req.body.name,
        tanggal: req.body.date,
        jenis: 'tambahan', // Otomatis set jenis ke 'tambahan'
        // Anda bisa menambahkan field lain dari req.body jika ada (misal: icon)
        icon: req.body.icon,
        iconBg: req.body.iconBg,
        iconColor: req.body.iconColor,
    };

    // Simpan ke database
    Kegiatan.create(kegiatan)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat membuat Kegiatan Tambahan."
            });
        });
};

// Mengambil semua kegiatan tambahan
const findAll = (req, res) => {
    Kegiatan.findAll({ 
        where: { jenis: 'tambahan' },
        order: [['tanggal', 'ASC']] // Urutkan berdasarkan tanggal
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Terjadi kesalahan saat mengambil Kegiatan Tambahan."
        });
    });
};

// Mengupdate kegiatan tambahan
const update = (req, res) => {
    const id = req.params.id;

    // Pastikan field 'jenis' tidak diubah
    const updateData = {
        nama: req.body.name,
        tanggal: req.body.date,
        icon: req.body.icon,
        iconBg: req.body.iconBg,
        iconColor: req.body.iconColor,
    };


    Kegiatan.update(updateData, {
        where: { id_kegiatan: id }
    })
    .then(num => {
        if (num == 1) {
            Kegiatan.findByPk(id).then(data => {
                res.send(data);
            });
        } else {
            res.status(404).send({
                message: `Tidak dapat memperbarui Kegiatan dengan id=${id}. Mungkin tidak ditemukan.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error memperbarui Kegiatan dengan id=" + id
        });
    });
};

// Menghapus kegiatan tambahan
const destroy = (req, res) => {
    const id = req.params.id;

    Kegiatan.destroy({
        where: { id_kegiatan: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Kegiatan berhasil dihapus!"
            });
        } else {
            res.status(404).send({
                message: `Tidak dapat menghapus Kegiatan dengan id=${id}. Mungkin tidak ditemukan.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Tidak dapat menghapus Kegiatan dengan id=" + id
        });
    });
};

module.exports = {
    create,
    findAll,
    update,
    destroy
};
