const mysql = require('mysql');
const ascii = require('ascii-art');
const sqlQueries = require('./lib/sqlQueries');

const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "Erhs4801$",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    sqlQueries.starting();            
});