var mysql = require('mysql');
var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database...");
});

module.exports = connection;
