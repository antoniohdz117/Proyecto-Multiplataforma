const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const salon = sequelize.define(
  "salon",
  {
    id_salon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombre_salon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "salon",
    timestamps: false
  },
);

module.exports = {
    salon
}