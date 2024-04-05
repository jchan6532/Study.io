const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database');

class MCQ extends Model {}

MCQ.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  mcq_options: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false,
  },
  mcq_answer: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'MCQ',
  tableName: 'MCQS',
  timestamps: false
});

module.exports = MCQ;
