var express = require('express');
var mongoose = require('mongoose');
var ipAddr = require('./routines/caller-ip');
var usersRouter = require('./users');
var blogRouter = require('./blog');
var randomRouter = require('./random');

module.exports = (app => {
  const {report} = global.TMACKAPI;

  mongoose.set('debug', (collectionName, methodName, ...args) => {
    console.log(`${ collectionName }::${ methodName }`, ...args);
  });

  const router = express.Router();
  const db = mongoose.connect(`${ process.env.MONGO_MLAB_URI }`, {useNewUrlParser: true});
  report.log('Mongoose connection ' + JSON.stringify(db));

// middleware that is specific to this router
  router.use((req, res, next) => {
    report.log('Start Base Router');
    const {ip, hostname} = req;
    if (!res.locals.data) {
      res.locals.data = encodeURI(JSON.stringify({
        ip,
        hostname,
        clientIP: ipAddr(req, report),
      }));
    }
    next();
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    report.log('Response Locals', JSON.stringify(res.locals));
    res.locals.title = "TMack's Portfolio API";
    res.render('index');
  });

  router.use('/api', [usersRouter, blogRouter(mongoose), randomRouter]);

  app.use('/', router);
  return app;
});
