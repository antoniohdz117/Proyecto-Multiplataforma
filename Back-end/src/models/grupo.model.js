const {DataTypes} = require("sequelize");
const { sequelize}= require("../connection");


//GRUPO

const grupo = sequelize.define(
  "grupo",
  {
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombre_grupo: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "grupo",
  },
);


module.exports = {
    grupo
}