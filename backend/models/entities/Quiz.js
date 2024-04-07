const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database');

class Quiz extends Model {}

Quiz.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  user_id: {
    type: DataTypes.STRING(255),
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
