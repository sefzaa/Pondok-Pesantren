// file: models/waliKamar.model.js
module.exports = (sequelize, DataTypes) => {
    const WaliKamar = sequelize.define('WaliKamar', {
        id_wali_kamar: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nama: { type: DataTypes.STRING, allowNull: false },
        tempat_lahir: { type: DataTypes.STRING },
        tanggal_lahir: { type: DataTypes.DATEONLY },
        jenis_kelamin: { type: DataTypes.ENUM('Laki-laki', 'Perempuan') },
        alamat: { type: DataTypes.TEXT },
        tahun_masuk: { type: DataTypes.STRING(4) },
        no_telp: { type: DataTypes.STRING },
    }, { tableName: 'wali_kamar', timestamps: true });
    return WaliKamar;
};