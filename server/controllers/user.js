// controller
const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
var nodemailer = require('nodemailer');
const myEmitter = require('../emitter');

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
		userModel.findUserByID(data.id)
		.then((data) => {
			console.log(data);
			var token = jwt.sign({
				id: data.id,
				username: data.username,
				email: data.email
			}, 'shhhhh');
			resolve(token);
		}).catch((err) => {
			reject(err);
		})
	})
}

exports.authenticate = (req, res) => {
	const data = req.body;
	userModel.findUserByUsername(data.username)
	.then(() => {
		console.log("<- AUTH ---");
		console.log(data);
		console.log("--- AUTH ->");
		userModel.checkLogin(data, res).then((res) => {
			var token = jwt.sign({
				id: data.id,
				username: data.username
			}, 'shhhhh');
			console.log(token);
			res.status(200).send({token});
		}).catch((error) => {
			console.log(error);
			res.status(401).send("error");
		})
	}).catch((err) => {
		console.log("error");
	})
}

exports.forgot = (data) => {
	return new Promise((resolve, reject) => {
		console.log(data);
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
		userModel.findUserByEmail(decoded.payload.email)
		.then((res) => {
			resolve();
		})
		.catch((err) => {
			reject(err);
		})
	})
}