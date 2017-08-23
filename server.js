var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var categories = require('./routes/categories');
var Category = require('./models/category');
var app = express();

require('dotenv').config();

var PORT = 3001;
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Add headers
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Pass to next layer of middleware
  next();
});

app.use('/api/categories', categories);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    name: err.name || 'undefined',
    error: err.message
  });
});

//Set up default mongoose connection
var dbUsername = process.env.DATABASE_USERNAME;
var dbPassword = process.env.DATABASE_PASSWORD;

var connectionString = `mongodb://${dbUsername}:${dbPassword}@ds145193.mlab.com:45193/operam`;
mongoose.Promise = global.Promise;
mongoose.connect(connectionString, {
    useMongoClient: true
  })
  .then(function() {
    console.log('Connection to mongoDB is now alive!');
    app.listen(PORT, function() {
      console.log(`Express server listening on port ${PORT}...`);
    });
  }, function(err) {
    console.error('MongoDB connection error:');
  });

module.exports = app;
