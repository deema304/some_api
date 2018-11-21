const log4js = require('log4js');
const logger = log4js.getLogger('[User]');
logger.level = 'debug';
const express = require('express');
const router = express.Router();

class User {
  constructor(controller, auth) {
    this._controller = controller;
    this._auth = auth;
  }

  async init() {
    await this._controller.init();
    logger.info('User router inited');
  }

  getRoutes() {
    router.get('/:id', this._auth.validateToken, this._controller.getUserById.bind(this._controller));
    router.get('/', this._auth.validateToken, this._controller.searchUsers.bind(this._controller));

    return router;
  }
}

module.exports = User;