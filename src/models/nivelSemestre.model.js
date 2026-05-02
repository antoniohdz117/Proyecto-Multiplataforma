const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const nivelSemestre = sequelize.define(
  "nivelSemestre",
  {
    id_nivel_semestre: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_semestre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "nivel_semestre",
    timestamps: false
  }
);

module.exports = {
  nivelSemestre,
};