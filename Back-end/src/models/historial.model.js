const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");


const historial =
  ("historial",
  {
    id_historial: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    folio_acta: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    id_alumno_curso: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    id_credito: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    clave_plantel: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    promedio_final: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  },
  {
    tableName: "historial",
    timestamps: false
  });


module.exports = {
    historial
}