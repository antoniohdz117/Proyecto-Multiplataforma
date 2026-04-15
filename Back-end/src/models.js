const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');



//definicon del modelo de alumno
const alumno = sequelize.define('alumno', {
  numero_cuenta:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: false
  },
  apellido_paterno: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: false
  },
  apellido_materno: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: false
  },
  curp: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: true
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: false
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: true
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull:false,
    unique: false
  },
  foto_perfil: {
    type: DataTypes.STRING,
    allowNull:true,
    unique: false
  },
  id_entidad: {
    type: DataTypes.INTEGER,
    allowNull:false,
    unique: true
  }
}, {
  tableName: 'alumno',
  timestamps: false
});





const EntidadFederativa = sequelize.define('EntidadFederativa', {
  //datos para la entidad federativa, id_entidad, nombre_entidad y abreviatura
  
  id_entidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_entidad: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  abreviatura: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'entidad_federativa',
  timestamps: false   
});



//VERIFICAR TIPO de Y RELACION

const profesor = sequelize.define('profesor', {
  id_profesor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  apellido_paterno: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  apellido_materno: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  curp: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  rfc: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  fecha_nacimiento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  sueldo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  all_data_professor: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  }

})





//ASINATURA

const asignatura = sequelize.define('asignatura', {
  clave_asignatura: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

//GRUPO

const grupo = sequelize.define('grupo', {
  id_grupo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nombre_grupo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
})

//tipo_curso

const tipoCurso = sequelize.define('tipoCurso', {
  id_tipo_curso: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombre_tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'tipo_curso',
  //VERIRFICAR LOS TIMESTAMPS
  timestamps: false
})


alumno.belongsTo(EntidadFederativa, {
  foreignKey: 'id_entidad'
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
  alumno
};


