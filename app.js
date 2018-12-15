var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);
const Sequelize = require('sequelize');
var mainRouter = express.Router();
var models = require('./models');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var searchRouter = require('./routes/search');
var browseRouter = require('./routes/browse');
var profileRouter = require('./routes/profile');
var usersRouter = require('./routes/users');
var queryRouter = require('./routes/query');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// requests for static files (css, js, images, etc) directed to public file
app.use(express.static(path.join(__dirname, 'public')));

// Connect to Session DB
const env = process.env.NODE_ENV || 'development';
const session_config = require(__dirname + '/config/session_config.json')[env];
var options = {
    host: session_config.host,
    port: session_config.port,
    user: session_config.username,
    password: session_config.password,
    database: session_config.database
};
var sessionStore = new MySQLStore(options);
app.use(
  session({
    name: "_event_finder", // The name of the cookie
    secret: "My Secret Key!",  // The secret is  required, and is used for signing cookies
    store: sessionStore, // Database to store sessions
    resave: false,  // Force save of session for each request
    saveUninitialized: false // Save a session that is new, but has not been modified
  })
);

// Pass DB Model and Modelview to Routers as request params
app.use('*', function(req, res, next) {
  req.locals = {};
  req.locals.models = models;
  req.locals.modelview = {};
  req.locals.modelview.session = req.session;
  next();
});

// Connect to Main DB
const db_config = require(__dirname + '/config/database_config.json')[env];
var options = {
    host: db_config.host,
    port: db_config.port,
    user: db_config.username,
    password: db_config.password,
    database: db_config.database
};
const sequelize = new Sequelize(db_config);
sequelize.authenticate().then(function(errors) { console.log(errors) });

// route requests to proper scripts
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/search', searchRouter);
app.use('/browse', browseRouter);
app.use('/profile', profileRouter);
app.use('/users', usersRouter);
app.use('/query', queryRouter);

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
