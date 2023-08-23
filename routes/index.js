var express = require('express');
var router = express.Router();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;