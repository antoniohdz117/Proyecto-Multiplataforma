const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/connection")

const profesor = sequelize.define(
  "profesor",
  {
    id_profesor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido_materno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    curp: {
      type: DataTypes.CHAR(18),
      allowNull: false,
      unique: true,
    },
    rfc: {
      type: DataTypes.CHAR(13),
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      unique: true,
    },
    sexo: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sueldo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "profesor",
    timestamps: false
  }
);

module.exports = {
  profesor,
};