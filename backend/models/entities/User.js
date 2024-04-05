const { Model, DataTypes, UUIDV4  } = require('sequelize');
const sequelize = require('../database');
const validator = require('validator');
const bcrypt = require('bcrypt');

class User extends Model {
  static async createUser(data) {

    const { email, password, first_name, last_name, user_name } = data
    if (!email || !password || !first_name || !user_name) throw Error('All fields must be filled in');
    if (!validator.isEmail(email)) throw Error('Entered email must be a valid email');
    if (!validator.isStrongPassword(password)) throw Error('Entered password must be ' + 
    'between 8-16 characters, have at least 1 upper case and lower case letter, 1 number, and a symbol');

    const exists = await this.findOne({where: {email}});
    if (exists) throw Error('Email is already in use');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash, first_name, last_name, user_name});

    return user;
  }

  static async validateUser(data) {
    const { email, password } = data;
    if (!email || !password) throw Error('All fields must be filled in');
    const user = await this.findOne({where: {email: email}});
    if (!user) throw Error('Incorrect email');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw Error('Incorrect Password');

    return user;
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  user_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: true
});

module.exports = User;
