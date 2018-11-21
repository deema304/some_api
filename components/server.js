const log4js = require('log4js');
const logger = log4js.getLogger('[Server]');
logger.level = 'debug';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('../config/config');

app.use(bodyParser.urlencoded({
  extended: true
}));

class Server {
  constructor(idexRouter, userRouter, itemRouter) {
    this._idexRouter = idexRouter;
    this._userRouter = userRouter;
    this._itemRouter = itemRouter;
  }

  async init(cb) {
    await this._idexRouter.init();
    await this._userRouter.init();
    await this._itemRouter.init();

    this.loadRouters();

    app.listen(config.port, () => {
      logger.info(`Server started on port ${config.port}`);
      cb();
    });
  }

  loadRouters() {
    app.use('/api', this._idexRouter.getRoutes());
    app.use('/api/user', this._userRouter.getRoutes());
    app.use('/api/item', this._itemRouter.getRoutes());
  }
}

module.exports = Server;