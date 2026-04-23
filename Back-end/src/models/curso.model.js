const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const curso = sequelize.define(
  "curso",
  {
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    cupo_maximo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    inscritos_actual: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    id_profesor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    clave_asignatura: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    id_oferta_semestral: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    id_tipo_curso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
  },
  {
    tableName: "curso",
  },
);



curso.belongsTo(profesor, {
  foreignKey: "id_profesor",
});

curso.belongsTo(asignatura, {
  foreignKey: "clave_asignatura",
});

curso.belongsTo(ofertaSemestral, {
  foreignKey: "id_oferta_semestral",
});

curso.belongsTo(tipoCurso, {
  foreignKey: "id_tipo_curso",
});

curso.belongsTo(grupo, {
  foreignKey: "id_grupo",
});

module.exports ={
    curso
}
