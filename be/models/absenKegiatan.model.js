// file: models/absenKegiatan.model.js
module.exports = (sequelize, DataTypes) => {
    const AbsenKegiatan = sequelize.define('AbsenKegiatan', {
        id_absen_kegiatan: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        status: { type: DataTypes.ENUM('Hadir', 'Izin', 'Sakit', 'Alpa'), allowNull: false },
        tanggal: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    }, { tableName: 'absen_kegiatan', timestamps: false });
    return AbsenKegiatan;
};