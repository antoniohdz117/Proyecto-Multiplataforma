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









const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }, 
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { tableName: 'authors' });

const Book = sequelize.define('Book', {

  isbn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantPages: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { tableName: 'books' });

alumno.belongsTo(EntidadFederativa, {
  foreignKey: 'id_entidad'
});


Author.hasMany(Book, { as: 'books', foreignKey: 'authorId' });
Book.belongsTo(Author, {
  foreignKey: "authorId",
});

module.exports = {
  Author,
  Book,
  EntidadFederativa,
  alumno
};


