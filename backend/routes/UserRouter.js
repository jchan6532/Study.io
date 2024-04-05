const express = require('express');
const { 
    getAllUsers,
    getUser,
    updateUser,
    deleteuser
} = require('../controllers/UserController');

const router = express.Router();

router.get('/', getAllUsers);





router.get('/:userid', getUser);

router.patch('/:userid', updateUser);

router.delete('/:userid', deleteuser);

module.exports = router;