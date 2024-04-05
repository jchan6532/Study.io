const User = require('../models/entities/User');
const bcrypt = require('bcrypt');
const validator = require('validator');

const getAllUsers = async (req, res) => {
    try{
        const users = await User.findAll();
        if (!users) throw Error('No users found');

        const filteredPassword = users.map(user => {
            const {id, email, first_name, last_name, user_name} = user;
            return {id, email, first_name, last_name, user_name};
        });
        res.status(200).json({users: filteredPassword})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getUser = async (req, res) => {
    const { userid } = req.params;

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userid)) return res.status(400).json({ error: 'Invalid UUID format' });

    try {
        const user = await User.findOne({ where: { id: userid } });
        if (!user) return res.status(404).json({ error: 'No user found' });

        const { id, email, first_name, last_name, user_name } = user;
        res.status(200).json({ id, email, first_name, last_name, user_name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { userid } = req.params;
    const {password, email} = req.body;

    try {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userid)) return res.status(400).json({ error: 'Invalid UUID format' });

        const user = await User.findByPk(userid);
        if (!user) throw Error('User not found');

        if (email) {
            if (!validator.isEmail(email)) throw Error('Entered email must be a valid email');
        }

        if (password) {
            if (!validator.isStrongPassword(password)) throw Error('Entered password must be ' + 
            'between 8-16 characters, have at least 1 upper case and lower case letter, 1 number, and a symbol');
        
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.update(req.body);
        res.status(200).json({updatedUser});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteuser = async (req, res) => {
    const { userid } = req.params;

    try {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userid)) return res.status(400).json({ error: 'Invalid UUID format' });

        const deleted = await User.destroy({where: { id: userid }});
        if (!deleted) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteuser
}