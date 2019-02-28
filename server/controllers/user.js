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
				location : data.location,
				age : data.age,
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
		checkInput.username(data.username)
		.then(() => {
			return checkInput.password(data.password);
		})
		.then(() => {
			console.log("hello authenticate");
			return userModel.findUserByUsername(data.username);
		})
		.then((result) => {
			if (!data.mailValidation) {
				reject({"status": "error", "msg": "mail not validate"});
				return;
			}
			console.log("hello authenticate*****");
			console.log("<- AUTH ---");
			console.log(data);
			console.log("--- AUTH ->");
			userModel.checkLogin(data.username, data.password)
			.then(() => {
				console.log(result);
				var token = jwt.sign({
					id: result.id,
					username: result.username,
					email: result.email
				}, process.env.JWT_KEY);
				resolve(token);
			}).catch((error) => {
				reject(error);
			})
		}).catch((err) => {
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
			}, process.env.JWT_KEY);
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
			return jwt.verify(token, process.env.JWT_KEY);
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
		let decoded = jwt.verify(token, process.env.JWT_KEY);
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

exports.updatePassSettings = (id, password, newPass, newPassConfirm) => {
	return new Promise((resolve, reject) => {
		userSettings.changePassword(id, password, newPass, newPassConfirm)
		.then((res) => {
			console.log("RES RES");
			resolve();
		})
		.catch((err) => {
			console.log("REJ REJ");
			reject(err);
		})
	})
}

exports.getAvatar = (id) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByID(id)
		.then(() => {
			resolve('public/pictures/user' + id + '/avatar' + '.jpg');
		})
		.catch(() => {
			reject({"status": "error", "msg": "id invalid"});
		})
	})
}
