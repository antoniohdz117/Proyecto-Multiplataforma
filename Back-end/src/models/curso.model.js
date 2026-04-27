const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const curso = sequelize.define(
  "curso",
  {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cupo_maximo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    inscritos_actual: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_profesor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    clave_asignatura: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_oferta_semestral: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_tipo_curso: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "curso",
}
);

module.exports ={
    curso
}
