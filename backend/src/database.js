const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'bibcxgec',
    host: 'snuffleupagus.db.elephantsql.com',
    database: 'bibcxgec',
    password: 'w8xaLax1LnBSxhLd6-MtwvzFYdFKbSc8',
    port: 5432
});

module.exports = pool;
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'lab1',
//     password: '009008007',
//     port: 5432
// });