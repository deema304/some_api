const log4js = require('log4js');
const logger = log4js.getLogger('[App]');
logger.level = 'debug';
const Injector = require('razr')(__dirname, './config/dependencies.js');

const server = Injector.get('Server');

server.init(() => {
  logger.info('App started');
});