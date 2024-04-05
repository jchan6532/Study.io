// Create sequelize instance
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('studyio', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
