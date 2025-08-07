// file: models/kamar.model.js
module.exports = (sequelize, DataTypes) => {
    const Kamar = sequelize.define('Kamar', {
        id_kamar: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nomor_kamar: { type: DataTypes.STRING, allowNull: false },
        kapasitas: { type: DataTypes.INTEGER, allowNull: false },
    }, { tableName: 'kamar', timestamps: false });
    return Kamar;
};