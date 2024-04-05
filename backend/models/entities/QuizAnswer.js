const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database');

class QuizAnswer extends Model {}

QuizAnswer.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'QuizAnswer',
  tableName: 'Quiz_Answers',
  timestamps: false
});

module.exports = QuizAnswer;
