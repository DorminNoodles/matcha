const socketio = require('socket.io');
const messagesModel = require('../models/messagesModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

let socketUsers = {};

module.exports = (server) => {
	const io = require('socket.io')(server);
	io.on('connection', (socket) => {
		socket.on('fromClient', (data) => {
			jwt.verify(data.token, process.env.JWT_KEY, (err, decoded) => {
				if (err) {
					socket.emit('errorMessage', 'Wrong token');
					return (err);
				}
				else {
					if (decoded.id) {
						messagesModel.new({from: decoded.id, to: data.to, body: data.msg});
						io.to(`${socketUsers[data.to]}`).emit('fromServer', data.msg);
					}
				}
			})
		})

		socket.on('auth', (token) => {
			if (token && Object.prototype.toString.call(token) === "[object String]") {
				jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
					if (err) {
						socket.emit('errorConnection', 'Wrong token');
						return (err);
					}
					else {
						if (decoded.id) {
							console.log(data);
							console.log(socket.id);
							socketUsers[decoded.id] = socket.id;
							io.emit('userConnect', decoded.id);
						}
					}
				})
			}
		})

	/*disconnect send userDisconnect with userId*/
		socket.on('disconnect', () => {
			console.log('disconnect : ', socket.id);
			for (let userId in socketUsers) {
	    		if (socketUsers.hasOwnProperty(userId) && socketUsers[userId] == socket.id) {
					io.emit('userDisconnect', userId);
					delete socketUsers[userId];
				}
			}
			console.log(socketUsers);
		})
	});
}
