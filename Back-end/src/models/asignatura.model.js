const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const asignatura = sequelize.define(
  "asignatura",
  {
    clave_asignatura: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "asignatura",
    timestamps: false
  }
);

module.exports = {
  asignatura,
};