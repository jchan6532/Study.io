// Create sequelize instance
const { Sequelize } = require('sequelize');
const pg = require('pg');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  host: process.env.POSTGRES_HOST,
  dialectModule: pg,
  port: process.env.POSTGRES_PORT,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = sequelize;
