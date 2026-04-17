const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const asignacionCurso =
  ("asignacionCurso",
  {
    id_asignacion_curso: {
      tupe: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    id_horario: {
      tupe: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    id_curso: {
      tupe: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    id_salon: {
      tupe: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "asignacion_curso",
  });

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
module.exports = {
  asignacionCurso,
};
