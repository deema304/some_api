const log4js = require('log4js');
const logger = log4js.getLogger('[IndexController]');
logger.level = 'debug';

class IndexController {
  constructor(mysql, auth) {
    this._mysql = mysql;
    this._auth = auth;
  }

  async init() {
    logger.info('IndexController inited');
  }

  async register(req, res) {
    try {
      await this._mysql.getModel('User').create(req.body);
    } catch (e) {
      return res.status(422).send(e.message);
    }

    res.status(200).json({ token: this._auth.createToken(req.body.email) });
  }

  async login(req, res) {
    try {
      const user = await this._mysql.getModel('User').findAndAuth(req.body);

      return res.status(200).json({ token: this._auth.createToken(user.email) });
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await this._mysql.getModel('User')
        .findOne({ where: { email: req.decoded.email } });

      return res.status(200).json(user);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }

  async updateCurrentUser(req, res) {
    try {
      const user = await this._mysql.getModel('User')
        .update({ email: req.decoded.email }, req.body);

      return res.status(200).json(user);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }
}

module.exports = IndexController;