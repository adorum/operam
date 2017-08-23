var Category = require('./models/category');
var mongoose = require('mongoose');
var scrapeData = require('./helpers/scrapeData');
require('dotenv').config();

//Set up default mongoose connection
var dbUsername = process.env.DATABASE_USERNAME;
var dbPassword = process.env.DATABASE_PASSWORD;

var connectionString = `mongodb://${dbUsername}:${dbPassword}@ds145193.mlab.com:45193/operam`;
mongoose.Promise = global.Promise;
mongoose.connect(connectionString, {
  useMongoClient: true
}).then(function() {
  var data = [];
  return scrapeData(82127, '', data)
    .then(function() {
      console.log('Scraping data finished successfully!');
      return data;
    });
}).then(function(data) {
  console.log('Saving to database...');
  return Category.deleteMany({})
    .then(function() {
      return Category.insertMany(data);
    });
}).then(function() {
  console.log('Saved!');
  process.exit();
}).catch(function(error) {
  console.error('Error occurred during scraping data');
  process.exit(1);
});
