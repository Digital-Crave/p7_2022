const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const db = require('./config/config');
const userRouters = require('./routers/user.routers');

const app = express()

app.use(helmet.xssFilter());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully');
    })
    .catch(error => {
        console.log('Unable to connect to the database : ', error);
    })

app.use('/api/auth', userRouters);

module.exports = { app, express };