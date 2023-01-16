const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('bibcxgec', 'bibcxgec', 'w8xaLax1LnBSxhLd6-MtwvzFYdFKbSc8', {
//     host: 'snuffleupagus.db.elephantsql.com',
//     dialect: 'postgres'
// })

// const sequelize = new Sequelize({
//     database: 'bibcxgec',
//     username: 'bibcxgec',
//     password: 'w8xaLax1LnBSxhLd6-MtwvzFYdFKbSc8',
//     host: 'snuffleupagus.db.elephantsql.com',
//     port: 5432,
//     dialect: "postgres",
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     },
//     define: {
//         timestamps: false
//     }
// });

// const sequelize = new Sequelize({
//     database: 'lab1',
//     username: 'postgres',
//     password: '009008007',
//     host: 'localhost',
//     port: 5432,
//     dialect: "postgres",
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     },
//     define: {
//         timestamps: false
//     }
// });

const db = new Sequelize({
    database: 'lab3',
    username: 'postgres',
    password: '009008007',
    host: 'localhost',
    port: 5432,
    dialect: "postgres",
    define: {
        timestamps: false
    }
});

module.exports.db = db;