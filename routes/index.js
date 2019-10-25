var express = require('express');
var mongoose = require('mongoose');
var usersRouter = require('./users');
var blogRouter = require('./blog');
var report = global.TMACKAPI.report;

module.exports = (app => {
  var ipAddr = require('./routines/caller-ip');

  mongoose.set('debug', (collectionName, methodName, ...args) => {
    console.log(`${ collectionName }::${ methodName }`, ...args);
  });

  const router = express.Router();
  const db = mongoose.connect(`${ process.env.MONGO_MLAB_URI }`, {useNewUrlParser: true});
  report.log('Mongoose connection ' + JSON.stringify(db));

// middleware that is specific to this router
  router.use((req, res, next) => {
    report.log('Start Time: ', Date.now());
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

  router.use('/api', [usersRouter, blogRouter(mongoose)]);

  app.use('/', router);
  return app;
});
