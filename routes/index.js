var express = require('express');
var mongoose = require('mongoose');
var usersRouter = require('./users');
var blogRouter = require('./blog');

const router = express.Router();
const db = mongoose.connect(`${process.env.MONGO_MLAB_URI}`, {useNewUrlParser: true});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'TMack\'s Portfolio API' });
});

module.exports = ((app) => {
  app.use('/', router);
  app.use('/users', usersRouter);
  app.use('/blog', blogRouter(mongoose));
  return app;
});
