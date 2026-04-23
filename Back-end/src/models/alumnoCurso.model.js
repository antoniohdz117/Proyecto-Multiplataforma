const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");


const alumnoCurso =
  ("alumnoCurso",
  {
    id_alumno_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    primer_parcial: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      unique: false,
    },
    segundo_parcial: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      unique: false,
    },
    tercer_parcial: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      unique: false,
    },
    estatus_evaluacion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    numero_cuenta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
  },
  {
    tableName: "alumno_curso",
    timestamps: false
  });


module.exports = {
    alumnoCurso
}