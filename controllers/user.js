const log4js = require('log4js');
const logger = log4js.getLogger('[UserController]');
logger.level = 'debug';

class UserController {
  constructor(mysql) {
    this._mysql = mysql;
  }

  async init() {
    logger.info('UserController inited');
  }

  async getUserById(req, res) {
    try {
      let user = await this._mysql.getModel('User')
        .getById(req.params.id);

      return res.status(200).json(user);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }

  async searchUsers(req, res) {
    try {
      let users = await this._mysql.getModel('User')
        .search(req.query);

      return res.status(200).json(users);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }
}

module.exports = UserController;