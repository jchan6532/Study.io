const express = require('express');
const requireAuthProvider = require('../middleware/requireAuthProvider');
const Quiz = require('../models/entities/Quiz');
const QuizQuestion = require('../models/entities/QuizQuestion');
const MCQ = require('../models/entities/MCQ');
const QuizAnswer = require('../models/entities/QuizAnswer');

const router = express.Router();

// GET endpoint to fetch all quizzes for a specific user
router.get('/all', requireAuthProvider, async (req, res) => {
  try {
    const {id} = req.userData;

    if (!id) return res.status(400).json({ message: 'User ID is required.' });

    const quizzes = await Quiz.findAll({
      where: { user_id: id },
      include: [{
        model: QuizQuestion,
        include: [
          { model: MCQ },
          { model: QuizAnswer }
        ]
      }]
    });
    console.log(quizzes);
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;