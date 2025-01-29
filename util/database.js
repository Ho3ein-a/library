const mySql = require('mysql2');
const pool = mySql.createPool({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'library',

});

module.exports = pool.promise() ; 