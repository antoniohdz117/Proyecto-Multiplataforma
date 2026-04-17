const { Sequelize } = require('sequelize');

// datos para la conexion a la base de datos, database, username, password y host
const database = "Multiplataforma";
const username = "postgres";
const password = "320284645";  
const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres', 
});

module.exports = {
  sequelize
}


//JERRAMIENTAS QUE OCUPAMOS ES CON EJS, EXPRESS