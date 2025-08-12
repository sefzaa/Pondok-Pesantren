// file: models/detailIzinAsrama.model.js
module.exports = (sequelize, DataTypes) => {
    const DetailIzinAsrama = sequelize.define('DetailIzinAsrama', {
        id_detail_izin_asrama: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        tanggal_awal: { type: DataTypes.DATE, allowNull: false },
        tanggal_akhir: { type: DataTypes.DATE, allowNull: false },
        jam_keluar: { type: DataTypes.TIME },
        jam_masuk: { type: DataTypes.TIME },
        isApprove_wk: { type: DataTypes.BOOLEAN, defaultValue: false },
        keterangan: { type: DataTypes.TEXT },
    }, { tableName: 'detail_izin_asrama', timestamps: true });
    return DetailIzinAsrama;
};