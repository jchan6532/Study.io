// Import models
const User = require('./entities/User');
const StudyMaterial = require('./entities/StudyMaterial');
const Quiz = require('./entities/Quiz');
const QuizAnswer = require('./entities/QuizAnswer');
const MCQ = require('./entities/MCQ');
const QuizQuestion = require('./entities/QuizQuestion');
const Mark = require('./entities/Mark');
const Concepts = require('./entities/Concepts')

// Define associations
User.hasMany(StudyMaterial, { foreignKey: 'user_id' });
StudyMaterial.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Quiz, { foreignKey: 'user_id' });
Quiz.belongsTo(User, { foreignKey: 'user_id' });

Quiz.hasMany(QuizQuestion, { foreignKey: 'quiz_id' });
QuizQuestion.belongsTo(Quiz, { foreignKey: 'quiz_id' });

MCQ.hasOne(QuizQuestion, { foreignKey: 'mcq_id' });
QuizQuestion.belongsTo(MCQ, { foreignKey: 'mcq_id' });

QuizAnswer.hasOne(QuizQuestion, { foreignKey: 'answer_id' });
QuizQuestion.belongsTo(QuizAnswer, { foreignKey: 'answer_id' });

Quiz.hasMany(Mark, { foreignKey: 'quiz_id' });
Mark.belongsTo(Quiz, { foreignKey: 'quiz_id' });

Quiz.hasMany(Concepts, { foreignKey: 'quiz_id' });
Concepts.belongsTo(Quiz, { foreignKey: 'quiz_id'});

// Export models and Sequelize for use in the application
module.exports = {
  User,
  StudyMaterial,
  Quiz,
  QuizAnswer,
  MCQ,
  QuizQuestion,
  Mark,
  Concepts
};
