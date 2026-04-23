const {DataTypes} = require("sequelize")
const {sequelize} = require("../config/connection")

//tupocurso

const tipoCurso = sequelize.define(
  "tipoCurso",
  {
    id_tipo_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombre_tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "tipo_curso",
    timestamps: false
  },
);


module.exports ={
    tipoCurso
}