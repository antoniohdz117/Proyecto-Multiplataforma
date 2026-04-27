const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const tipoCurso = sequelize.define(
  "tipoCurso",
  {
    id_tipo_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "tipo_curso",
  }
);

module.exports = {
  tipoCurso,
};