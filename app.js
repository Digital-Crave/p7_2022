const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const db = require('./config/config');
const path = require('path');
const userRouters = require('./routers/user.routers');
const postRouters = require('./routers/post.routers');
const commentRouters = require('./routers/comment.routers');

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

path.join(__dirname)

app.use("/images", express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRouters);
app.use('/api/posts', postRouters);
app.use('/api/comments', commentRouters);


module.exports = { app, express };