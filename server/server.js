// Vendor imports
var express = require('express');
var bodyParser = require('body-parser');

// Local imports
var indexRouter = require('./routes/index');
var dbConnection = require('./db/connection');

// Init express
var app = express();

// Middleware
app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // Thanks, Sasha!

// Set index router
app.use('/', indexRouter);

// Set db connection
dbConnection.initializeDB();

// Start server
var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log('Listening on port', port, '. Use Control + C to exit.');
})
