const path = require('path');
const fs = require('fs');
const StudyMaterial = require('../models/entities/StudyMaterial');
const Quiz = require('../models/entities/Quiz');
const QuizQuestion = require('../models/entities/QuizQuestion');
const MCQ = require('../models/entities/MCQ');
const Concepts = require('../models/entities/Concepts')
const { getIO } = require('../services/socket');
const { generateQuiz } = require('../services/generateQuiz');

const storeQuizToDb = async (quizJson, userId, quizName) => {
  const quizData = JSON.parse(quizJson);
  const newQuiz = await Quiz.create({
    user_id: userId,
    name: quizName
  });

  for (const question of quizData.quiz) {
    let mcqOptions = Object.values(question.options);
    let correctOption = question.correct_answer;
    
    // Create MCQ options
    const newMCQ = await MCQ.create({
      mcq_options: mcqOptions,
      mcq_answer: correctOption,
    });
  
    // Create a new quiz question and associate it with the MCQ options
    const newQuizQuestion = await QuizQuestion.create({
      quiz_id: newQuiz.id,
      question: question.question,
      isMCQ: true,
      mcq_id: newMCQ.id,
      answered_right: false
    });
  }

  for (const new_concept of quizData.concepts) {
    
    const addConcepts = await Concepts.create({
      concept: new_concept,
      quiz_id: newQuiz.id
    });
  }
}

const uploadDocument = async (req, res) => {
  const {id} = req.userData;
  const {title} = req.body;
  const {file} = req;

  if (!file) return res.status(400).json({error: 'No file uploaded'});
  const fileid = path.basename(file.filename, path.extname(file.filename));

  try {
    const studyMaterial = await StudyMaterial.create({
        id: fileid,
        user_id: id,
        title: title,
        filename: file.originalname,
        upload_time: new Date()
    });

    res.status(201).json({studyMaterial});

    const uploadPath = path.join(__dirname, '..', 'uploads', 'study-materials', id, file.filename);
    const quiz = await generateQuiz(uploadPath);
    console.log(quiz);

    //Populate database here
    await storeQuizToDb(quiz, id, file.originalname);

    const io = await getIO();
    io.emit(`${id}`, { message: 'File is done analyzing' });
  } catch(error) {
    if (file && file.path) {
        fs.unlink(file.path, (err) => {
            if (err) console.error('Error deleting temporary file:', err);
        });
    }
    console.log(error.message);
    if (!res.headersSent) res.status(500).json({error: error.message});
  }
}

module.exports = {
  uploadDocument
}