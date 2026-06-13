const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const ofertaSemestral = sequelize.define(
  "ofertaSemestral",
  {
    id_oferta_semestral: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_periodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_nivel_semestre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "oferta_semestral",
    timestamps: false
  }
);

module.exports = {
  ofertaSemestral,
};