var express = require('express');
var Category = require('../models/category');
var transform = require('../helpers/tranformation');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  Category.find({}).exec()
    .then(function(docs) {
      if (!docs.length) {
        res.status(503).send({
          name: 'SERVER IS WORKING',
          error: 'Data are not ready yet. Please try again a bit later.'
        });
        return;
      }

      const treeData = transform.tranformArray2tree(docs);
      res.send(treeData);
    })
    .catch(function(err) {
      return next(err);
    });
});

module.exports = router;
