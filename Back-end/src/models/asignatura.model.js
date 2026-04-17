const {DataTypes, Association} = require("sequelize");
const {sequelize} = require("../connection")



const asignatura = sequelize.define(
  "asignatura",
  {
    clave_asignatura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "asignatura",
  },
);




module.exports= {
    asignatura
}