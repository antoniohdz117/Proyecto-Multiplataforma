const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

const ofertaSemestral = sequelize.define(
  "ofertaSemestral",
  {
    id_oferta_semestral: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    id_periodo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    id_nivel_semestre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "oferta_semestral",
    timestamps: false,
  },
);

module.exports = {
  ofertaSemestral,
};
