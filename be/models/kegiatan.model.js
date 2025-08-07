// --- Model untuk Kegiatan & Tahfidz ---
// file: models/kegiatan.model.js
module.exports = (sequelize, DataTypes) => {
    const Kegiatan = sequelize.define('Kegiatan', {
        id_kegiatan: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nama: { type: DataTypes.STRING, allowNull: false },
        jenis: { type: DataTypes.STRING },
        tanggal: { type: DataTypes.DATE, allowNull: false },
    }, { tableName: 'kegiatan', timestamps: false });
    return Kegiatan;
};