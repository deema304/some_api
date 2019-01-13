const log4js = require('log4js');
const logger = log4js.getLogger('[Mongo]');
logger.level = 'debug';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

class Mongo {
  constructor() {
    this._db = null;
  }

  async init() {
    return MongoClient.connect('mongodb://localhost:27017/some_api', { useNewUrlParser: true })
      .then(db => {
        this._db = db;
        logger.info('Mongo inited');
      });
  }

  getDb() {
    return this._db.db('some_api');
  }

  getMongo() {
    return mongodb;
  }
}

module.exports = Mongo;