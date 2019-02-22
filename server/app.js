"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);

const user = require('./routes/user');
const users = require('./routes/users');
const messages = require('./routes/messages');
const likes = require('./routes/likes');
const like = require('./routes/like');
const block = require('./routes/block');
const photos = require('./routes/photos');
const emitter = require('./emitter');
const activationMail = require('./services/activationMail');
const jwtToken = require('./middlewares/jwtToken');
const geoloc = require('./services/geoloc');
const chat = require("./routes/chat");
const score = require("./routes/score");
const visit = require("./routes/visit");

const socketIO = require("./services/socketIO")(server);

// the following two will emit to all the sockets connected to `/`
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*MIDDLEWARE*/
app.use(jwtToken);

/*ROUTES*/
app.use('/api/user', user);
app.use('/api/messages', messages);
app.use('/api/users', users);
app.use('/api/likes', likes);
app.use('/api/like', like);
app.use('/api/block', block);
app.use('/api/photos', photos);
app.use('/api/score', score);
app.use('/api/visit', visit);

server.listen(3000);
