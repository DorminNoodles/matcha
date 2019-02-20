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

		socket.on('disconnect', () => {
			console.log('disconnect : ', socket.id);
			for (let key in socketUsers) {
	    		if (socketUsers.hasOwnProperty(key) && socketUsers[key] == socket.id) {
					delete socketUsers[key];
				}
			}
			console.log(socketUsers);
		})
	});
}
