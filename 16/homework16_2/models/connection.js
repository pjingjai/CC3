const mysql = require('mysql2/promise');

module.exports = 
    mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'design_pattern'
    });