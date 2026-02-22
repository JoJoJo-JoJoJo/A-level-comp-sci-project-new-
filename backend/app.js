//? Import required modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//? Import routers from ./routes
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const formsRouter = require('./routes/forms');

const app = express();

//? View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//? Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//? Router setup
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/forms', formsRouter);

//? Catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

//? Set up error handler
app.use(function (err, req, res, _next) {
  //? Set locals, only throw error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //? Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
