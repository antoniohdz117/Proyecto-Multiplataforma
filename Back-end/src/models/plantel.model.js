const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");


const plantel = sequelize.define(
  "plantel",
  {
    clave_plante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombre_plantel: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "plantel",
    timestamps: false
  },
);


module.exports = {
    plantel
}