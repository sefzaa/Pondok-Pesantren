// file: models/santri.model.js
module.exports = (sequelize, DataTypes) => {
    const Santri = sequelize.define('Santri', {
        id_santri: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nama: { type: DataTypes.STRING, allowNull: false },
        tempat_lahir: { type: DataTypes.STRING },
        tanggal_lahir: { type: DataTypes.DATEONLY },
        jenis_kelamin: { type: DataTypes.ENUM('Laki-laki', 'Perempuan') },
        alamat: { type: DataTypes.TEXT },
        tahun_masuk: { type: DataTypes.STRING(4) },
        status_aktif: { type: DataTypes.BOOLEAN, defaultValue: true },
        foto: { type: DataTypes.STRING },
    }, { tableName: 'santri', timestamps: true });
    return Santri;
};