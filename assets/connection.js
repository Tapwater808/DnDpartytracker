'use strict';
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'party_db',
});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;