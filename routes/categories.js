var express = require('express');
var Category = require('../models/category');
var transform = require('../helpers/tranformation');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  Category.find({}, function(err, categories) {
    if(err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }
    const treeData = transform.tranformArray2tree(categories);
    res.send(treeData);
  });
});

module.exports = router;
