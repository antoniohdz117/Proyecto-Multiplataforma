const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection");

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
  },
);

//VERIFICAR TIPO de Y RELACION

const profesor = sequelize.define("profesor", {
  id_profesor: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rfc: {
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
    unique: true,
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fecha_nacimiento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  sueldo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  all_data_professor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

//ASINATURA

const asignatura = sequelize.define("asignatura", {
  clave_asignatura: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

//GRUPO

const grupo = sequelize.define("grupo", {
  id_grupo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nombre_grupo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

//tipo_curso

const tipoCurso = sequelize.define(
  "tipoCurso",
  {
    id_tipo_curso: {
      type: DataTypes.STRING,
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
  },
);

const periodoAcademico = sequelize.define(
  "periodoAcademico",
  {
    id_periodo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    periodo_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_inicio: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_fin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "periodo_academico",
  },
);

const nivelSemestre = sequelize.define(
  "nivelSemestre",
  {
    id_nivel_semestre: {
      type: DataTypes.STRING,
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
  },
);

const ofertaSemestral = sequelize.define(
  "ofertaSemestral",
  {
    id_oferta_semestral: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    id_periodo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    id_nivel_semestre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "oferta_semestral",
  },
);

const curso = sequelize.curso(
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

const horario = sequelize.define(
  "horario",
  {
    id_horario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    dia: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    hora_inicio: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hora_fin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "horario",

  },
);

const salon = sequelize.define('salon', {
  id_salon: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  nombre_salon: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }

}, {
  tableName: 'salon'
})

const asignacionCurso = ('asignacionCurso', {
  id_asignacion_curso: {
    tupe: DataTypes.INTEGER,
    allowNull: false,
    unique:true
  },
  id_horario: {
    tupe: DataTypes.INTEGER,
    allowNull: false,
    unique:true
  },
  id_curso: {
    tupe: DataTypes.INTEGER,
    allowNull: false,
    unique:true
  },
  id_salon: {
    tupe: DataTypes.INTEGER,
    allowNull: false,
    unique:true
  }
}, {
  tableName: 'asignacion_curso'

})


const alumnoCurso = ('alumnoCurso', {
  id_alumno_curso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  primer_parcial: {
    type: DataTypes.DECIMAL(4,2),
    allowNull: false,
    unique: false
  },
  segundo_parcial: {
    type: DataTypes.DECIMAL(4,2),
    allowNull: false,
    unique: false
  },
  tercer_parcial: {
    type: DataTypes.DECIMAL(4,2),
    allowNull: false,
    unique: false
  },
  estatus_evaluacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  numero_cuenta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  id_curso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false
  }
})




//relaciones

alumno.belongsTo(EntidadFederativa, {
  foreignKey: "id_entidad",
});

//EJEMPLO DE RELACION

// const Author = sequelize.define('Author', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   }
// }, { tableName: 'authors' });

// const Book = sequelize.define('Book', {

//   isbn: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   cantPages: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 0
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   }
// }, { tableName: 'books' });

// Author.hasMany(Book, { as: 'books', foreignKey: 'authorId' });
// Book.belongsTo(Author, {
//   foreignKey: "authorId",
// });

module.exports = {
  Author,
  Book,
  EntidadFederativa,
  alumno,
  profesor,
  asignatura,
  grupo,
  tipoCurso,
  periodoAcademico,
  nivelSemestre,
  ofertaSemestral,
  curso,
  horario,
  salon,
  asignacionCurso,
  alumnoCurso,
  plantel,
  credito,
  historial
};
