const mysql = require ('mysql');

var config = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  port: process.env.SQL_PORT,
  ssl: true,
};

const connection = new mysql.createConnection (config);

connection.connect (function (err) {
  if (err) {
    console.log ('!!! Cannot connect !!! Error:');
    throw err;
  } else {
    console.log ('Connection established.');
  }
});

module.exports = connection;
