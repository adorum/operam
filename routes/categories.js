var express = require('express');
var Category = require('../models/category');
var transform = require('../helpers/tranformation');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  Category.find({}).exec()
    .then(function(docs) {
      const treeData = transform.tranformArray2tree(docs);
      res.send(treeData);
    })
    .catch(function(err) {
      return next(err);
    });
});

module.exports = router;
