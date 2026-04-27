const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const grupo = sequelize.define(
  "grupo",
  {
    id_grupo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_grupo: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      unique: true
    },
  },
  {
    tableName: "grupo",
  }
);

module.exports = {
  grupo,
};