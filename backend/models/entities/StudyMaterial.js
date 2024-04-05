const { Model, DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../database');

class StudyMaterial extends Model {}

StudyMaterial.init({
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
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  filename: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  upload_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'StudyMaterial',
  tableName: 'Study_Materials',
  timestamps: false
});

module.exports = StudyMaterial;
