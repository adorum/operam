var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageCategory = new Schema({
  name: String,
  size: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Category', ImageCategory);
