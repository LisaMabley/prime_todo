var postgrs = require('pg');

var connectionString = '';

if (process.env.DATABASE_URL) {
  postgrs.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;

} else {
  connectionString = 'postgres://localhost:5432/todo_app';
}

function initializeDB() {
  postgrs.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('Error connecting to database.', err);

    } else {
      var itemTable = 'CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, text VARCHAR(80) NOT NULL, completed BOOLEAN DEFAULT false);';
      var query = client.query(itemTable);

      query.on('end', function() {
        console.log('Successfully ensured schema exists');
        done();
      });

      query.on('error', function() {
        console.log('Error creating schema');
        process.exit(1);
      });
    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
