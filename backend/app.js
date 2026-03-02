//? Import required modules
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//? Import routers from ./routes
const indexRouter = require('./routes/index');
const formsRouter = require('./routes/forms');

const app = express();

//? Allow CORS origins to be used for client + server
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  optionsSuccessStatus: 200
}));

//? View engine setup - may not need, could use for error page though
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
