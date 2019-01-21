const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
// const userModel = require('../models/userModel');
var nodemailer = require('nodemailer');
const myEmitter = require('../emitter');

const events = require('events');

const userModel = require('../models/userModel');
const checkInput = require('../services/checkInput');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('pouet', function() {
	console.log("test Event !");
});

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		let userService = new UserService();
		userService.createUser({
				username : data.username,
				password : data.password,
				firstname : data.firstname,
				lastname : data.lastname,
				email : data.email
		})
		.then((res) => {
			console.log(res);
			resolve();
		})
		.catch((err) => {
			reject(err);
		})
	})
};

exports.find = (data) => {
	return new Promise((resolve, reject) => {
		let user = new userService();
		user.authenticate(data.username, data.password)
		.then(() => {
			resolve();
		})
		.catch(() => {
			reject();
    	})
	})
}

// exports.authenticate = (req, res) => {
// 	const data = req.body;
// 	userModel.findUserByUsername(data.username)
// 	.then(() => {
// 		console.log("<- AUTH ---");
// 		console.log(data);
// 		console.log("--- AUTH ->");
// 		userModel.checkLogin(data, res).then((res) => {
// 			var token = jwt.sign({
// 				id: data.id,
// 				username: data.username
// 			}, 'shhhhh');
// 			res.status(200).send({token});
// 		}).catch((error) => {
// 			console.log(error);
// 			res.status(401).send("error");
// 		})
// 	}).catch((err) => {
// 		console.log("error");
// 	})
// }

exports.authenticate = (data) => {
	return new Promise((resolve, reject) => {
		console.log("hello authenticate");

		checkInput.username(data.username)
		.then(() => {
			return checkInput.password(data.password)
		})
		.then(() => {
			return userModel.findUserByUsername(data.username, data.password);
		})
		.then((res) => {
			console.log("hello authenticate*****");
			console.log("<- AUTH ---");
			console.log(data);
			console.log("--- AUTH ->");
			userModel.checkLogin(data.username, data.password)
			.then((res) => {
				var token = jwt.sign({
					id: res.id,
					username: res.username
				}, 'shhhhh');
				resolve(token);
			}).catch((error) => {
				console.log(error);
				reject(error);
			})
		}).catch((err) => {
			console.log("error");
			reject(err);
		})
	})
}

exports.forgot = (data) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByEmail(data)
		.then((res) => {
			var token = jwt.sign({
				id: res.id,
				username: res.username,
				email: res.email
			}, 'shhhhh');
			console.log(token);
			myEmitter.emit('forgotPass', {
				username: res.username,
				email: res.email
			}, token);
			resolve();
		}).catch((error) => {
			console.log("Not a registered email address !");
			reject();
		})
	})
}

exports.recog = (data) => {
	return new Promise((resolve, reject) => {
		var decoded = jwt.decode(data, {complete: true});
		console.log(decoded.header);
		console.log(decoded.payload);
		console.log(decoded);
		userModel.findUserByEmail(decoded.payload.email)
		.then((res) => {
			resolve();
		})
		.catch((err) => {
			reject(err);
		})
	})
}
