const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const todolistRouter = require("./routes/todolist");
const mongoose = require('mongoose');
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/todolist');

// Overwrite Mongoose Promises to ES6 Promises
mongoose.Promise = global.Promise; 

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/todolist', todolistRouter);

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
  // res.render('error');
  console.log(err.message);
  res.send(err.message);
});

module.exports = app;
