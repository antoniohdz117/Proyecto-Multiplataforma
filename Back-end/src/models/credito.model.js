const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");


const credito = sequelize.define(
  "credito",
  {
    id_credito: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tipo_credito: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      unique: false,
    },
    punto_credito: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
  },
  {
    tableName: "credito",
  },
);


module.exports = {
    credito
}