var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var scrapeData = require('./helpers/scraper');
var categories = require('./routes/categories');
var Category = require('./models/category');
var app = express();

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

app.set('port', process.env.PORT || 3001);

//Set up default mongoose connection
var mongoDB = 'mongodb://operam:operam@ds145193.mlab.com:45193/operam';
mongoose.connect(mongoDB, {
  useMongoClient: true
}).then(function(db) {
  var server = app.listen(app.get('port'), function() {
    console.log(`Express server listening on port ${server.address().port}`);

    Category.find({}).then(function(categories) {
      if (!categories.length) {
        console.log('Starting scraping data the web...');

        (function downloadData() {
          const results = [];
          scrapeData(82127, '', results)
            .then(function() {
              Category.collection.insertMany(results);
              Category.collection.save();
              //fs.writeFileSync('./result.json', JSON.stringify(results) , 'utf-8');
              console.log('Scraping data finished successfully!');
            })
            .catch(function(err) {
              console.error('Erorr occurred during scraping data. Restarting...');
              downloadData();
            })
        })();

        /*
                        // NOTE: THIS IS ONLY FOR DEV PUSPORSE: Read data from file instead of scrate then from server
                        var obj = JSON.parse(fs.readFileSync('./result.json', 'utf8'));
                        Category.collection.insertMany(obj);
                        Category.collection.save();
        */
      } else {
        console.log('Data are prepared to work.');
      }
    }, function(err) {
      console.error(err);
    });
  });
}, function(err) {
  console.error('MongoDB connection error:');
});

module.exports = app;
