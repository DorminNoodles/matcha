// controller
const User = require('../services/user');
const UserModel = require('../services/user');
const jwt = require('jsonwebtoken');


const events = require('events');

const user = require('../models/userModel');
const Token = require('../services/token');
const checkInput = require('../services/checkInput');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('pouet', function() {
	console.log("test Event !");
});


exports.register = (data) => {
	return new Promise((resolve, reject) => {
		let user = new User();

		console.log(data);
		user.createUser({
				username : data.username,
				password : data.password,
				firstname : data.firstname,
				email : data.email,
				location : data.location
		})
		.then((res) => {
			eventEmitter.emit('pouet');
			console.log(res);
			return user.saveUser(res);
		})
		.catch((err) => {
			reject(err);
		})
		console.log(data);
		resolve('Perfect !');
	})
};

exports.authenticate = (data) => {
	return new Promise((resolve, reject) => {
		console.log("fuck 1");
		checkInput.username(data.username).then(() => {
			user.findUserByName(data.username)
			.then((res) => {
				console.log(res);
				new Token().hello();
				// resolve(new Token().hello());
				// var token =
				//
				// jwt.sign({
				// 	id: data.id,
				// 	username: data.username,
				// 	email: data.email
				// }, 'shhhhh');
				// resolve(token);
			}).catch((err) => {
				console.log("fuck 2");
				reject(err);
			})
		}).catch((err) => {
			reject(err);
		})
	})
}
