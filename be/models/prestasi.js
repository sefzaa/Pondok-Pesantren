// file: models/prestasi.model.js
module.exports = (sequelize, DataTypes) => {
    const Prestasi = sequelize.define('Prestasi', {
        id_prestasi: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        prestasi: { type: DataTypes.TEXT, allowNull: false },
        tanggal: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
    }, { tableName: 'prestasi', timestamps: true });
    return Prestasi;
};