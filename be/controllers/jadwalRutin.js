// controllers/jadwalRutin.js

const db = require('../models');
const JadwalRutin = db.JadwalRutin;

// Membuat dan menyimpan jadwal rutin baru
const create = (req, res) => {
    // Validasi request body
    if (!req.body.name || !req.body.repetitionType) {
        return res.status(400).send({
            message: "Nama kegiatan dan tipe repetisi tidak boleh kosong!"
        });
    }

    // Buat objek jadwal rutin dari request
    const jadwalRutin = {
        name: req.body.name,
        repetitionType: req.body.repetitionType,
        time: req.body.time || null,
        days: req.body.days || [],
        dates: req.body.dates || [],
        icon: req.body.icon,
        iconBg: req.body.iconBg,
        iconColor: req.body.iconColor,
    };

    // Simpan ke database
    JadwalRutin.create(jadwalRutin)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat membuat Jadwal Rutin."
            });
        });
};

// Mengambil semua jadwal rutin dari database
const findAll = (req, res) => {
    JadwalRutin.findAll({ order: [['createdAt', 'ASC']] }) // Mengurutkan berdasarkan waktu dibuat
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil Jadwal Rutin."
            });
        });
};

// Mengupdate jadwal rutin berdasarkan ID
const update = (req, res) => {
    const id = req.params.id;

    JadwalRutin.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            // Jika berhasil, kirim kembali data yang sudah diupdate
            JadwalRutin.findByPk(id).then(data => {
                res.send(data);
            });
        } else {
            res.status(404).send({
                message: `Tidak dapat memperbarui Jadwal Rutin dengan id=${id}. Mungkin tidak ditemukan atau request body kosong.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error memperbarui Jadwal Rutin dengan id=" + id
        });
    });
};

// Menghapus jadwal rutin berdasarkan ID
const destroy = (req, res) => {
    const id = req.params.id;

    JadwalRutin.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Jadwal Rutin berhasil dihapus!"
            });
        } else {
            res.status(404).send({
                message: `Tidak dapat menghapus Jadwal Rutin dengan id=${id}. Mungkin tidak ditemukan.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Tidak dapat menghapus Jadwal Rutin dengan id=" + id
        });
    });
};

// Ekspor semua fungsi dalam satu objek
module.exports = {
    create,
    findAll,
    update,
    destroy
};
