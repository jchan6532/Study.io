const User = require('../models/entities/User');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d'});
}

const login = async (req, res) => {
    try {
        const user = await User.validateUser(req.body);
        const token = createToken(user.id);
        const { id, email, first_name, last_name, user_name } = user;
        return res.status(200).json({id, email, first_name, last_name, user_name, token});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

const signup = async (req, res) => {
    try {
        const user = await User.createUser(req.body);
        const token = createToken(user.id);
        res.status(200).json({...req.body, token});

    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = {
    login,
    signup
}