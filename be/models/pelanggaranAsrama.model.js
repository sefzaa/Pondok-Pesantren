// file: models/pelanggaranAsrama.model.js
module.exports = (sequelize, DataTypes) => {
    const PelanggaranAsrama = sequelize.define('PelanggaranAsrama', {
        id_pelanggaran: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nama: { type: DataTypes.STRING, allowNull: false },
        jenis: { type: DataTypes.STRING },
        bobot: { type: DataTypes.INTEGER },
    }, { tableName: 'pelanggaran_asrama', timestamps: false });
    return PelanggaranAsrama;
};