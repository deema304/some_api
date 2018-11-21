const log4js = require('log4js');
const logger = log4js.getLogger('[IndexRouter]');
logger.level = 'debug';
const express = require('express');
const router = express.Router();

class IndexRouter {
  constructor(controller, auth) {
    this._controller = controller;
    this._auth = auth;
  }

  async init() {
    await this._controller.init();
    logger.info('IndexRouter inited');
  }

  getRoutes() {
    router.post('/register', this._controller.register.bind(this._controller));
    router.post('/login', this._controller.login.bind(this._controller));
    router.get('/me', this._auth.validateToken, this._controller.getCurrentUser.bind(this._controller));
    router.put('/me', this._auth.validateToken, this._controller.updateCurrentUser.bind(this._controller));

    return router;
  }
}

module.exports = IndexRouter;