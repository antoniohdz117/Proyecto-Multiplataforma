const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");


const alumnoCurso = sequelize.define(
  "alumnoCurso",
  {
    id_alumno_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    primer_parcial: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    segundo_parcial: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    tercer_parcial: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    estatus_evaluacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_cuenta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "alumno_curso",
    timestamps: false
  }
);

module.exports = {
    alumnoCurso
}