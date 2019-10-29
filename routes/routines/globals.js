/**
 * globals js file created by Tamara G. Mack on 24-Oct-19 for portfolio-api
 */
global.TMACKAPI = (() => {
  require('dotenv').config();
  const Console = require('./logger');

  const pkg = require('../../package.json');
  const {
    NODE_ENV = 'production',
    PORT = pkg.config.port,
    DEBUG = false,
  } = process.env;

  const obj = Object.create({}, {
    addProperty: {
      value: addProperty,
      enumerable: true,
    },
    report: {
      value: new Console('module'),
      enumerable: true,
    },
  });
  obj.addProperty('port', PORT);
  obj.addProperty('env', NODE_ENV);
  obj.addProperty('debug', DEBUG);

  return obj;

  function addProperty(key, value, enumerable = true) {
    Object.defineProperty(this, key, {
      value,
      enumerable,
    });
  }
})();
