const {DataTypes} = require("sequelize");
const { sequelize}= require("../connection");

const nivelSemestre = sequelize.define(
  "nivelSemestre",
  {
    id_nivel_semestre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    nombre_semestre: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "nivel_semestre",
    timestamps: false
  },
);

module.exports ={
    nivelSemestre
}