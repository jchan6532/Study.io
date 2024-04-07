const express = require('express');
const { 
    getAllUsers,
    getUser,
    updateUser,
    deleteuser
} = require('../controllers/UserController');
const User = require('../models/entities/User');
const Quiz = require('../models/entities/Quiz');
const Concepts = require('../models/entities/Concepts');

const router = express.Router();

router.get('/:userId/concepts', async (req, res) => {
    const { userId } = req.params;
  
    try {
        const userWithQuizzesAndConcepts = await User.findOne({
            where: { id: userId },
            include: [{
                model: Quiz,
                include: [{
                    model: Concepts,
                    attributes: ['id', 'concept', 'updatedAt']
                }]
            }]
        });

        if (!userWithQuizzesAndConcepts) {
            return res.status(404).json({ message: 'User not found' });
        }

        const concepts = userWithQuizzesAndConcepts.Quizzes.flatMap(quiz => quiz.Concepts);

        res.json({ concepts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
  
router.get('/', getAllUsers);





router.get('/:userid', getUser);

router.patch('/:userid', updateUser);

router.delete('/:userid', deleteuser);

module.exports = router;