const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database');

class Concepts extends Model {}

Concepts.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  concept: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  quiz_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: 'Quizzes', 
        key: 'id',
    }
  },
}, {
  sequelize,
  modelName: 'Concepts',
  tableName: 'Concepts',
  timestamps: true
});

module.exports = Concepts;