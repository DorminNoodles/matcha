// controller
const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
var nodemailer = require('nodemailer');

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
			res.status(200).send({token});
		}).catch((error) => {
			console.log(error);
			res.status(401).send("error");
		})
	}).catch((err) => {
		console.log("error");
	})
}

exports.forgot = (req, res) => {
	const data = req.body;
	userModel.forgotPassword(data)
	.then(() => {
		console.log("<- FGPSD1 ---");
		console.log(data);
		console.log("--- FGPSD1 ->");
		console.log("Mail sent");
	}).catch((err) => {
		console.log("error");
	})
}
