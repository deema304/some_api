const Sequelize = require('sequelize');
const Base = require('./base');

class User extends Base {
  constructor(sequelize) {
    super();
    this._schema = sequelize.define('user', {
      name: {
        type: Sequelize.DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Name must not be empty'
          }
        }
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Email must not be empty'
          },
          isEmail: {
            msg: 'Email format is not correct'
          }
        }
      },
      password: {
        type: Sequelize.DataTypes.STRING
      }
    }, {});
  }

  async findAndAuth(credentials) {
    const user = await this.findOne({ where: { email: credentials.email } });

    if(!user) {
      throw new Error('Email is not registered');
    }

    if(user.password !== credentials.password) {
      throw new Error('Wrong password');
    }

    return user;
  }
}

module.exports = User;
