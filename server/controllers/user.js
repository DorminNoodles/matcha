const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const myEmitter = require('../emitter');

const events = require('events');

const userModel = require('../models/userModel');
const checkInput = require('../services/checkInput');
const userSettings = require('../models/userSettings');

var eventEmitter = new events.EventEmitter();

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		let userService = new UserService();
		userService.createUser({
				username : data.username,
				password : data.password,
				firstname : data.firstname,
				lastname : data.lastname,
				email : data.email,
				orientation : data.orientation,
				gender : data.gender,
				location : data.location
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

// exports.find = (data) => {
// 	return new Promise((resolve, reject) => {
// 		let user = new userService();
// 		user.authenticate(data.username, data.password)
// 		.then(() => {
// 			resolve();
// 		})
// 		.catch(() => {
// 			console.log("PABLITO");
// 			reject();
//     	})
// 	})
// }

exports.find = (data) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByUsername(data.username)
		.then((res) => {
			resolve(res);
		}).catch((error) => {
			reject(error);
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
		var decoded = jwt.decode(data, {complete: true});
		console.log(decoded.header);
		console.log(decoded.payload);
		userModel.findUserByEmail(decoded.payload.email)
		console.log("YES");
		console.log(pwd);
		console.log(confirmPwd);
		if (pwd != confirmPwd){
			reject({"status": "error"});
			return;
		}
		console.log("HASH");
		console.log(pwd);
		bcrypt.hash(pwd, 10)
		.then((hash) => {
			var decoded = jwt.verify(token, {complete: true});
			// console.log(decoded);
			console.log("HASH");
			user.changePwd(decoded.email, decoded.username, pwd)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			})
		})
		.catch((err) => {
			console.log("HASH");
			reject(err);
		})
	})
}

exports.activate = (token) => {
	return new Promise((resolve, reject) => {
		let decoded = jwt.verify(token, 'shhhhh');
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

exports.checkEmailAvailability = (id, email) => {
	return new Promise((resolve, reject) => {
		checkInput.email(email)
		.then((res) => {
			return userModel.findUserByID(id);
		}).then((data) => {
			if (data.email == email)
				resolve();
			return checkInput.emailAlreadyTaken(email);
		}).then((res) => {
			resolve();
		}).catch((error) => {
			reject();
		})
	})
}

exports.updatePassSettings = (token, password, newPass, newPassConfirm) => {
	return new Promise((resolve, reject) => {
		var decoded = jwt.decode(token, {complete: true});
		console.log(decoded.header);
		console.log(decoded.payload.id);
		userSettings.changePassword(decoded.payload.id, password, newPass, newPassConfirm)
		.then((res) => {
			resolve();
		})
		.catch((err) => {
			reject(err);
		})
	})
}