const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");


const horario = sequelize.define(
  "horario",
  {
    id_horario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    dia: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    tableName: "horario",
    timestamps: false
  },
);

module.exports = {
    horario
}