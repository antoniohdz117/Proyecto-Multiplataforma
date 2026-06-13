const { Sequelize } = require('sequelize');
require('dotenv').config();


// Conexion a servicio de aws ec2
const sslconfig = {
  require: true,
  rejectUnauthorized: false,
};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    
  })
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      dialectOptions: {
        ssl: sslconfig,
      },
    }
  );

module.exports = {
  sequelize
}


//JERRAMIENTAS QUE OCUPAMOS ES CON EJS, EXPRESS