require ('dotenv').config ();

const express = require ('express');
const app = express ();
const connection = require ('./database');
var path = require ('path');

app.route ('/robberies/').get (function (req, res, next) {
  connection.query ('SELECT * FROM `robberies`', function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.json (results);
  });
});

app.route ('/robberies/:eventId').get (function (req, res, next) {
  connection.query (
    'SELECT * FROM `robberies` WHERE eventId = ?',
    req.params.eventId,
    function (error, results, fields) {
      if (error) throw error;
      res.json (results);
    }
  );
});

app.get ('/status', (req, res) => res.send ('Working!'));

app.get ('/', (req, res) => {
  res.sendFile (path.join (__dirname + '/public/index.html'));
});

app.use (express.static ('public'));

// Port 8080 for Google App Engine
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => {
  console.log (`App listening on port ${PORT}`);
  console.log ('Press Ctrl+C to quit.');
});
