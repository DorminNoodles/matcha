const socketio = require('socket.io');

let socketUsers = {};

module.exports = (server) => {
	const io = require('socket.io')(server);
	io.on('connection', (socket) => {
		socket.on('message42', (data) => {
			console.log("send message : " + data.msg);
			console.log(data);
			console.log(socket.id);
			io.to(`${socketUsers[data.id]}`).emit('sendMsg', data.msg);
		})

		socket.on('connectMsg', (data) => {
			console.log(data);
			console.log(socket.id);
			socketUsers[data.token] = socket.id;
		})


	/*disconnect send userDisconnect with userId*/
		socket.on('disconnect', () => {
			console.log('disconnect : ', socket.id);
			for (let userId in socketUsers) {
	    		if (socketUsers.hasOwnProperty(userId) && socketUsers[userId] == socket.id) {
					io.emit('userDisconnected', userId);
					delete socketUsers[userId];
				}
			}
			console.log(socketUsers);
		})
	});
}
