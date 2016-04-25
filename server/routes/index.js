// Vendor imports
var express = require('express');
var path = require('path');

// Local imports
var items = require('./items');

// Init router
var router = express.Router();

// Route root dir server calls
router.get('/', function(request, response) {
  var index = path.join(__dirname, '../public/views/index.html');
  response.sendFile(index);
})

// Direct items calls to items router
router.use('/items', items);

module.exports = router;
