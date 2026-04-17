const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

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



//asignacion curso
asignacionCurso.belongsTo(horario, {
  foreignKey: "id_horario",
});

asignacionCurso.belongsTo(curso, {
  foreignKey: "id_curso",
});

asignacionCurso.belongsTo(salon, {
  foreignKey: "id_salon",
});

module.exports ={
    curso
}
