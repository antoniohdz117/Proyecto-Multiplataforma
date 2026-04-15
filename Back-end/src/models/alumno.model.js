const {DataTypes} = require("sequelize");
const {sequelize} = require("../connection")


//definicon del modelo de alumno
const alumno = sequelize.define(
  "alumno",
  {
    numero_cuenta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    apellido_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    apellido_materno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    curp: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
    },
    foto_perfil: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    id_entidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
  },
  {
    tableName: "alumno",
  },
);



alumno.belongsTo(EntidadFederativa, {
  foreignKey: "id_entidad",
});




module.exports= {
    alumno
}