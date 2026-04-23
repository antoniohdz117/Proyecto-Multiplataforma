const {DataTypes} = require("sequelize")
const {sequelize} = require("../config/connection")

//periodo_academico
const periodoAcademico = sequelize.define(
  "periodoAcademico",
  {
    id_periodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    periodo_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "periodo_academico",
  },
);


module.exports ={
    periodoAcademico
}