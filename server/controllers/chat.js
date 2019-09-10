// const io = require('socket.io')();
const server = require('http').createServer();
const io = require('socket.io')(server);
const chatModel = require('../models/chatModel');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		chatModel.new(data)
			.then((res) => { 
				resolve(res); })
			.catch((err) => { reject(err); })
	})
}

exports.chatSubscribe = (userID) => {
	return new Promise((resolve, reject) => {
		console.log(userID);
		io.on('connection', (socket) => {
			io.removeAllListeners();
			console.log("Hello Connection");
			socket.on('subscribeSendMsg' + userID, () => {
				console.log("sendMSGTO => " + userID);
				socket.emit('msg', 'hello 42');
			})
		});
	})
}

io.on('connection', (socket) => {
	console.log("socket.io connection : ");
	// socket.on('subscribe', () => {
	// 	console.log("sendMSGTO => ");
	// 	socket.emit('msg', 'hello boite');
	// })
});

console.log("listen please");
// io.listen(8000);
