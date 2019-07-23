const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const myEmitter = require('../emitter');

const events = require('events');

const userModel = require('../models/userModel');
const checkInput = require('../services/checkInput');
const location = require('../controllers/location');

var eventEmitter = new events.EventEmitter();

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		userModel.checkData(data)
		.then((res) => {
			return userModel.saveUser(data);
		})
		.then((res) => {
			return location.findGps(data);
		})
		.then((res) => {
			myEmitter.emit('userRegistered', data);
			resolve(res);
		})
		.catch((err) => {
			reject(err);
		})
	})
};

exports.createUser = (data) => {
	return new Promise((resolve, reject) => {
		userModel.checkData(data)
		.then((res) => {
			console.log("Hello");
			resolve();
		})
		.catch((err) => {
			console.log("Ouech");
			reject();
		})
	});
}

exports.get = (userId) => {
	return new Promise((resolve, reject) => {
		userModel.findUserById(userId)
		.then((user) => {
			user.password = '';
			resolve(user);
		})
		.catch((err) => {
			reject(err);
		})
	});
}

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
	});
}

exports.authenticate = (data) => {
	return new Promise((resolve, reject) => {
		checkInput.username(data.username)
		.then(() => {
			return checkInput.password(data.password)
		})
		.then(() => {
			console.log("hello authenticate");
			return userModel.findUserByUsername(data.username);
		})
		.then((result) => {
			if (!result.mailValidation) {
				reject({"status": "error", "key": "mailActivation", "msg": "mail not validate"});
				return;
			}
			userModel.checkLogin(data.username, data.password)
			.then(() => {
				console.log("HUMMM");
				console.log(result);
				let datas = {};

				 datas.token = jwt.sign({
					id: result.id,
					username: result.username,
					email: result.email
				}, process.env.JWT_KEY);


				datas.user = {
					id: result.id,
					username: result.username,
					email: result.email,
					gender: result.gender,
					orientation: result.orientation,
					location: result.location,
					latitude: result.latitude,
					longitude: result.longitude,
					age: result.age
				};
				resolve(datas);
			}).catch((error) => {
				console.log(error);
				reject(error);
			})
		}).catch((err) => {
			// console.log({"status": "error", "key": "database", "msg": "Connexion error !"});
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

exports.getAvatar = (id) => {
	return new Promise((resolve, reject) => {
		userModel.findUserById(id)
		.then(() => {
			resolve('public/pictures/user' + id + '/avatar' + '.jpg');
		})
		.catch(() => {
			reject({"status": "error", "msg": "id invalid"});
		})
	})
}
