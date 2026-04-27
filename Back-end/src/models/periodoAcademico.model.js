const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const periodoAcademico = sequelize.define(
  "periodoAcademico",
  {
    id_periodo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    periodo_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "periodo_academico",
  }
);

module.exports = {
  periodoAcademico,
};