const socketio = require('socket.io');
const messagesModel = require('../models/messagesModel');
const jwt = require('jsonwebtoken');

let socketUsers = {};

module.exports = (server) => {
	const io = require('socket.io')(server);
	io.on('connection', (socket) => {
		socket.on('fromClient', (data) => {
			jwt.verify(data.token, "shhhhhhh", (err, decoded) => {
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

			// console.log("send message : " + data.msg);	2
			// console.log(data);
			// console.log(socket.id);
			// messagesModel.new({from : data.token.});
		})

		socket.on('auth', (data) => {
			if (data.token && Object.prototype.toString.call(data.token) === "[object String]") {
				jwt.verify(data.token, "shhhhhhh", (err, decoded) => {
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

				// .then((res) => {
				// 	console.log("helloooo");
				// 	return ("ok");
				// })
				// .catch((err) => {
				// 	return("Token error");
				// })

				// let token = jwt.verify(data.token, "shhhhhhh");
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
