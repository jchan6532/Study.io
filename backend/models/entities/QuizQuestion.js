const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database');

class QuizQuestion extends Model {}

QuizQuestion.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  quiz_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Quizzes',
      key: 'id',
    }
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isMCQ: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  mcq_id: {
    type: DataTypes.UUID,
    references: {
      model: 'MCQS',
      key: 'id',
    },
    allowNull: true,
  },
  answer_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Quiz_Answers',
      key: 'id',
    },
    allowNull: true,
  },
  answered_right: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'QuizQuestion',
  tableName: 'Quiz_Questions',
  timestamps: false
});

module.exports = QuizQuestion;
