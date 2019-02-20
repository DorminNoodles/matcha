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


// io.on('connection', (socket) => {
//
// 	socket.on('message42', (data) => {
// 		console.log(data);
// 		console.log(socket.id);
// 		socketUsers[data.token] = socket.id;
// 		// console.log(socketUsers);
// 	})
//
// 	socket.on('connectMsg', (data) => {
// 		console.log(data);
// 		console.log(socket.id);
// 		socketUsers[data.token] = socket.id;
// 		// console.log(socketUsers);
// 	})
//
// 	socket.on('disconnect', () => {
// 		console.log('disconnect : ', socket.id);
// 		for (let key in socketUsers) {
//     		if (socketUsers.hasOwnProperty(key) && socketUsers[key] == socket.id) {
// 				delete socketUsers[key];
// 			}
// 		}
// 		console.log(socketUsers);
// 	})
// });


// io.on('connection', (socket) => {
// 	console.log('a user connected  ', socket.id);
// 	socket.on('message42', (data) => {
// 		// console.log(data);
// 		if (!socketUsers.hasOwnProperty(data.token))
// 			socketUsers[data.token] = socket.id;
//
// 		socket.to(socketUsers[data.token]).emit('sendMsg', data.msg);
//
// 		// if (!socketUsers[socket.id])
// 		// 	socketUsers[socket.id] = user_id;
// 		console.log(socketUsers, data);
// 	})
//
// 	socket.on('disconnect', () => {
// 		console.log('Got disconnect!');
// 		let tmp;
//
// 		for (var elem in socketUsers)
// 			if (socketUsers.hasOwnProperty(elem))
// 				if (socketUsers[elem] == socket.id)
// 					delete socketUsers[elem];
// 		console.log(socketUsers)
// 	});
// });


/*socket IO*/
// const chatIO = require("./controllers/chat");

// app.get('/api/chat', (req, res) => {
// 	// console.log(req.query.id)
// 	if (req.query.id == 42) {
// 		io.on('connection', function(socket){
// 			socket.removeAllListeners()
// 			socket.on('chat message', (msg) => {
// 				console.log(msg);
// 				// io.emit('from server' + 42, msg);
// 				// console.log("received on server : " + msg);
// 				chat.new({id: req.query.id, to: 2, msg: msg})
// 				.then(() => {
// 					console.log("ok");
// 				})
// 			})
// 		});
// 	}
// 	res.sendFile(__dirname + '/socketTest.html');
// });

server.listen(3000);
