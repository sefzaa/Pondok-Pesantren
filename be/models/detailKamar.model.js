// file: models/detailKamar.model.js
module.exports = (sequelize, DataTypes) => {
    const DetailKamar = sequelize.define('DetailKamar', {
        id_detail_kamar: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        tahun_ajaran: { type: DataTypes.STRING, allowNull: false },
    }, { tableName: 'detail_kamar', timestamps: false });
    return DetailKamar;
};