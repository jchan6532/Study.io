const express = require('express');
const { 
    login,
    signup,
    signinWithProvider
} = require('../controllers/AuthController');
const requireAuthProvider = require('../middleware/requireAuthProvider');

const router = express.Router();


router.post('/signup', signup);

router.post('/login', login);

router.post('/provider-signin', requireAuthProvider, signinWithProvider);

module.exports = router;