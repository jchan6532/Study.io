const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database');

class Quiz extends Model {}

Quiz.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'Quiz',
  tableName: 'Quizzes',
  timestamps: true
});

module.exports = Quiz;
