const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./sequelize').db;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error DB.AUTHENTICATE: ', err);
})

app.use('/', routes);

db.sync().then(() => {
    console.log('Sync access!!!')
    app.listen(process.env.PORT || 5000);
}).catch(err => console.log("Error DB.SYNC: " + err));
