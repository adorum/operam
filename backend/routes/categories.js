var express = require('express');
var Category = require('../models/category');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    Category.find({}, function(err, categories) {
        if (err) {
            res.status(500).send('Something bad happened');
        } else {
            res.send(categories);
        }
    });
});

module.exports = router;
