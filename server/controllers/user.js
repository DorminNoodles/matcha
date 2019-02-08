const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const myEmitter = require('../emitter');

const events = require('events');

const userModel = require('../models/userModel');
const checkInput = require('../services/checkInput');

var eventEmitter = new events.EventEmitter();

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		// console.log(data.avatar.name);
		let userService = new UserService();
		userService.createUser({
				username : data.username,
				password : data.password,
				firstname : data.firstname,
				lastname : data.lastname,
				email : data.email,
				orientation : data.orientation,
				gender : data.gender,
				location : data.location,
				avatar : data.avatar.name
		})
		.then((res) => {
			console.log(res);
			resolve();
		})
		.catch((err) => {
			console.log("error in new: ", err);
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

exports.authenticate = (data) => {
	return new Promise((resolve, reject) => {
		console.log("hello authenticate");
		checkInput.username(data.username)
		.then(() => {
			return checkInput.password(data.password)
		})
		.then(() => {
			console.log("hello authenticate");
			return userModel.findUserByUsername(data.username);
		})
		.then((result) => {
			console.log("hello authenticate*****");
			console.log("<- AUTH ---");
			console.log(data);
			console.log("--- AUTH ->");
			userModel.checkLogin(data.username, data.password)
			.then(() => {
				console.log("HUMMM");
				console.log(result);
				var token = jwt.sign({
					id: result.id,
					username: result.username,
					email: result.email
				}, 'shhhhhhh');
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
			}, 'shhhhhhh');
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

exports.updatePassword = (token, pwd, confirmPwd) => {
	return new Promise((resolve, reject) => {
		let passCrypted;
		if (pwd != confirmPwd){
			reject({"status": "error password difference"});
			return;
		}
		console.log("test :p");
		bcrypt.hash(pwd, 10)
		.then((hash) => {
			passCrypted = hash;
			console.log("OK_1");
			return jwt.verify(token, "shhhhhhh");
		})
		.then((decoded) => {
			console.log("OK_2");
			console.log("HERE+++++++");
			return userModel.changePwd(decoded.email, decoded.username, passCrypted)
		})
		.then((res) => {
			console.log("GOOD");
			resolve();
		})
		.catch((err) => {
			console.log("LAST CATCH ***********");
			reject(err);
		})
	})
}

exports.activate = (token) => {
	return new Promise((resolve, reject) => {
		let decoded = jwt.verify(token, 'shhhhhhh');
		console.log(decoded);
		userModel.activateUser(decoded.username, decoded.email)
		.then((res) => {
			resolve(res);
		})
		.catch((err) => {
			reject(err);
		})
	})
}

exports.getAvatar = (id) => {
		return ('pictures/user' + id + '/avatar' + '.jpg');
}
