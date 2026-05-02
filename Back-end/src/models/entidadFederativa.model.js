const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/connection")


const EntidadFederativa = sequelize.define(
  "EntidadFederativa",
  {
    //datos para la entidad federativa, id_entidad, nombre_entidad y abreviatura

    id_entidad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_entidad: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    abreviatura: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "entidad_federativa",
    timestamps: false
  },
);

module.exports = {
    EntidadFederativa
}