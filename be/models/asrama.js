// file: models/asrama.model.js
module.exports = (sequelize, DataTypes) => {
    const Asrama = sequelize.define('Asrama', {
        id_asrama: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nama_gedung: { type: DataTypes.STRING, allowNull: false },
        penanggung_jawab: { type: DataTypes.STRING },
    }, { tableName: 'asrama', timestamps: false });
    return Asrama;
};