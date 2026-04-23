const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/connection")



const profesor = sequelize.define("profesor", {
  id_profesor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  apellido_paterno: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  apellido_materno: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
    unique: true,
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true,
  },
  sueldo: {
    type: DataTypes.DECIMAL (10,2),
    allowNull: false,
    unique: true,
  },
  all_data_professor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'profesor'
});



module.exports= {
    profesor
}