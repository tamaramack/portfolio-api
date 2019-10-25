var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var implementAPIRoutes = require('./routes');

let app = express();
const publicPath = path.join(__dirname, 'public');
const {report} = global.TMACKAPI;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('trust proxy',  ['loopback', 'linklocal']);

app.use(logger('dev'));
app.use(logger('combined', {
  stream: report._writeOut
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: publicPath,
  dest: publicPath,
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(publicPath));

// Add API routes
app = implementAPIRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
