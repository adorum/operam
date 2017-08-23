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
  var results = [];
  scrapeData(82127, '', results)
    .then(function() {
      console.log('Scraping data finished successfully!');
      return Category.deleteMany({})
        .then(function() {
          return Category.insertMany(results)
            .then(function() {
              console.log('Scraped data saved to DB!');
              return Promise.resolve();
            });
        })

    }, function(error) {
      console.error(`Erorr occurred during scraping data: ${JSON.stringify(error)}`);
    });
});
