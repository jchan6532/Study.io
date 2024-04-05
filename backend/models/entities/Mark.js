const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database');

class Mark extends Model {}

Mark.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  quiz_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Quizzes',
      key: 'id',
    },
    allowNull: false,
  },
  total_marks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  scored_marks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  percentage: {
    type: DataTypes.NUMERIC(5, 2),
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  }
}, {
  sequelize,
  modelName: 'Mark',
  tableName: 'Marks',
  timestamps: false
});

module.exports = Mark;
