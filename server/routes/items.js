// Vendor imports
var express = require('express');
var path = require('path');
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;

// Init router
var router = express.Router();

// Routes
// Ugh, so verbose and repetitive!
router.get('/all', function(request, response) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('Error connecting to database', err);
      response.sendStatus(500);

    } else {
      var query = client.query('SELECT * FROM items ORDER BY completed ASC');
      var results = [];

      query.on('row', function(row) {
        results.push(row);
      });

      query.on('end', function() {
        response.send(results);
        done();
      });

      query.on('error', function(error) {
        console.log('Error running query', error);
        res.sendStatus(500);
        done();
      });
    }
  });
});

router.post('/new', function(request, response) {
  pg.connect(connectionString, function(err, client, done) {
    if(err){
      console.log('Error connecting to database', err);
      response.sendStatus(500);

    } else {
      var itemText = request.body.text;
      var query = client.query('INSERT INTO items (text) VALUES ($1)', [itemText]);

      query.on('end', function() {
        response.sendStatus(200);
        done();
      });

      query.on('error', function(err) {
        console.log('Error running query', err);
        response.sendStatus(500);
        done();
      });
    }
  });
});

router.put('/complete', function(request, response) {
  pg.connect(connectionString, function(err, client, done) {
    if(err){
      console.log('Error connecting to database', err);
      response.sendStatus(500);

    } else {
      var itemId = request.body.id;
      var query = client.query('UPDATE items SET completed = TRUE WHERE id = ' + itemId);

      query.on('end', function() {
        response.sendStatus(200);
        done();
      })

      query.on('error', function(err) {
        console.log('Error running query', err);
        response.sendStatus(500);
        done();
      });
    }
  });
});

router.put('/uncomplete', function(request, response) {
  pg.connect(connectionString, function(err, client, done) {
    if(err){
      console.log('Error connecting to database', err);
      response.sendStatus(500);

    } else {
      var itemId = request.body.id;
      var query = client.query('UPDATE items SET completed = FALSE WHERE id = ' + itemId);

      query.on('end', function() {
        response.sendStatus(200);
        done();
      })

      query.on('error', function(err) {
        console.log('Error running query', err);
        response.sendStatus(500);
        done();
      });
    }
  });
});

router.delete('/', function(request, response) {
  pg.connect(connectionString, function(err, client, done) {
    if(err){
      console.log('Error connecting to database', err);
      response.sendStatus(500);

    } else {
      var itemId = request.body.id;
      console.log(itemId);
      var query = client.query('DELETE FROM items WHERE id = ' + itemId);

      query.on('end', function() {
        response.sendStatus(200);
        done();
      })

      query.on('error', function(err) {
        console.log('Error running query', err);
        response.sendStatus(500);
        done();
      });
    }
  });
});

module.exports = router;
