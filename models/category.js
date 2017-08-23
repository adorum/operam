var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
  name: String,
  size: Number
});

module.exports = mongoose.model('Category', Category);
