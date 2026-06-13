const { Sequelize } = require('sequelize');
require('dotenv').config();

const useSSL = process.env.DB_SSL === 'true';

const sequelizeOptions = {
  dialect: 'postgres',
};

if (useSSL) {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      ...sequelizeOptions,
      protocol: 'postgres',
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        ...sequelizeOptions,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      }
    );

module.exports = {
  sequelize
};

// HERRAMIENTAS QUE OCUPAMOS: EJS, EXPRESS