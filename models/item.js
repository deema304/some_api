const Sequelize = require("sequelize");
const Base = require('./base');

class Item extends Base {
  constructor(sequelize) {
    super();
    this._schema = sequelize.define('item', {
      image: {
        type: Sequelize.DataTypes.STRING
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Title must not be empty"
          }
        }
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Description must not be empty"
          }
        }
      }
    }, {});
  }
}

module.exports = Item;