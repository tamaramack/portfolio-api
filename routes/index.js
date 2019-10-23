var express = require('express');
var mongoose = require('mongoose');
var usersRouter = require('./users');
var blogRouter = require('./blog');

module.exports = ((app, logger) => {
  var ipAddr = require('./routines/caller-ip');
  var console = require('../bin/js/logger')();

  mongoose.set('debug', (collectionName, methodName, ...args) => {
    console.log(`${ collectionName }::${ methodName }`, ...args);
  });

  const router = express.Router();
  const db = mongoose.connect(`${ process.env.MONGO_MLAB_URI }`, {useNewUrlParser: true});

// middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Start Time: ', Date.now());
    if (!Object.keys(res.locals).length) {
      const {ip, hostname} = req;
      Object.assign(res.locals, {
        ip,
        hostname,
        clientIP: ipAddr(req, console),
      });
    }
    next();
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    console.log('Response Locals', JSON.stringify(res.locals));
    res.render('index', {title: 'TMack\'s Portfolio API'});
  });

  router.use('/api', [usersRouter, blogRouter(mongoose)]);

  app.use('/', router);
  return app;
});
