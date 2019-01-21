// controller
const User = require('../services/user');
const UserModel = require('../services/user');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		let user = new User();

		user.createUser({
				username : data.username,
				password : data.password,
				firstname : data.firstname
		})
		.then((res) => {
			console.log(res);
			return user.saveUser(res);
		})
		.catch((err) => {
			reject(err);
		})

		console.log(data);
		return user.saveUser(data);
		resolve('Perfect !');
	})
};

exports.find = (data) => {
	return new Promise((resolve, reject) => {
		user.findUserByID(data.id)
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

exports.authenticate = (data) => {
	return new Promise((resolve, reject) => {
		user.findUserByName(data.username)
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
