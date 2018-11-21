const log4js = require('log4js');
const logger = log4js.getLogger('[Mysql]');
logger.level = 'debug';

const requireDir = require('requiredir');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const config = require('../config/config').mysql;

class Mysql {
  constructor() {
    this._config = config;
    this.models = {};

    this._sequelize = new Sequelize(
      this._config.database,
      this._config.user,
      this._config.password,
      {
        host: this._config.host,
        dialect: 'mysql',
        operatorsAliases: false,
        logging: false
      });

    requireDir('../models').toArray().forEach(modelClass =>
      this.models[modelClass.name] = new modelClass(this._sequelize));
  }

  async init() {}

  getModel(modelName) {
    return this.models[modelName];
  }
}

module.exports = Mysql;