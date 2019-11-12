"use strict";
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const express = require('express');
var app = express();
var server = app.listen(3300, () => { console.log("listen on 3300") })
var socket = require('socket.io');
var io = socket(server);


const user = require('./routes/user');
const users = require('./routes/users');
const notification = require('./routes/notification');
const likes = require('./routes/likes');
const like = require('./routes/like');
const block = require('./routes/block');
const photos = require('./routes/photos');
const emitter = require('./emitter');
const jwtToken = require('./middlewares/jwtToken');
const chat = require("./routes/chat");
const score = require("./routes/score");
const tag = require("./routes/tag");
const tags = require("./routes/tags");
const authenticate = require("./routes/authenticate");
const location = require("./routes/location");
const report = require("./routes/report");


//SERVICES
const activationMail = require('./services/activationMail');
const geolocation = require('./services/geolocation');


const cors = require("cors"); //TO ACCESS LOCALHOST-LOCALHOST CONNECTION

app.use(cors()); //CORS MIDDLEWARE
app.use(fileUpload({
	createParentPath: true,
	limits: { fileSize: 50 * 1024 * 1024 },
}));//upload files

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// the following two will emit to all the sockets connected to `/`
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(express.static('public/pictures/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*MIDDLEWARE*/
app.use(jwtToken);

/*ROUTES*/
app.use('/api/user', user);
app.use('/api/chat', chat);
app.use('/api/users', users);
app.use('/api/likes', likes);
app.use('/api/like', like);
app.use('/api/photos', photos);
app.use('/api/score', score);
app.use('/api/tag', tag);
app.use('/api/tags', tags);
app.use('/api/authenticate', authenticate);
app.use('/api/location', location);
app.use('/api/block', block);
app.use('/api/report', report);
app.use('/api/notification', notification);

const sockets = require('./socket.js');

sockets(io)

module.exports = server;
