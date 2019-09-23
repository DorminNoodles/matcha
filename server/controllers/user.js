const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const myEmitter = require('../emitter');

const events = require('events');

const userModel = require('../models/userModel');
const inputModel = require('../models/inputModel');

var eventEmitter = new events.EventEmitter();

const avatarUpload = (data, id) => {
	return new Promise((resolve, reject) => {
		if (!data.avatar || !data.avatar.mv) {
			reject({ status: "error", key: "avatar", msg: "Avatar upload error !" })
			return;
		}

		data.avatar.mv('public/pictures/' + id + '/avatar_' + id + "_" + data.avatar.name, (err) => {
			if (err)
				reject({ status: "error", key: "avatar", msg: "Avatar upload error !" });
			else
				resolve({ status: "success" });
		})
	})
}

exports.identity = (gender, orientation) => {

	let identity = 000000
	let mask = 000000

	if (gender === "male")
		identity = orientation === "heterosexual" ? "010001" : orientation === "homosexual" ? "001010" : "011011";
	else if (gender === "female")
		identity = orientation === "heterosexual" ? "100010" : orientation === "homosexual" ? "000101" : "100111";


	if (gender === "male")
		mask = orientation === "heterosexual" ? "100000" : orientation === "homosexual" ? "001000" : "000010";
	else if (gender === "female")
		mask = orientation === "heterosexual" ? "010000" : orientation === "homosexual" ? "000100" : "000001";

	return { identity, mask }
}

exports.new = (data) => {
	return new Promise((resolve, reject) => {

		let filter = [
			'username',
			'firstname',
			'lastname',
			'email',
			'password',
			'location',
			'latitude',
			'longitude',
			'avatar',
			'gender',
			'orientation',
			'age',
			'ageMin',
			'ageMax',
			'bio',
			'distance',
		];

		if (data.password !== data.confirmation)
			reject({ status: 'error', key: "password", msg: 'Password not confirm' });
		else
			delete data['confirmation'];

		for (let elem in data) {
			if (!filter.includes(elem)) {
				reject({ status: 'error', msg: 'Unhautorized key in data' });
				return;
			}
		}

		let binary = this.identity(data.gender, data.orientation)

		userModel.checkDataNew(data)
			.then((res) => {
				return userModel.saveUser({
					...data,
					...binary,
					avatar: data.avatar.name
				});
			})
			.then((res) => {
				return avatarUpload(data, res.id);
			})
			.then((res) => {
				myEmitter.emit('userRegistered', data);
				resolve({ status: 'success', msg: "user created" });
			})
			.catch((err) => { reject({ status: "error", data: err }); })
	})
};

exports.get = (id, user_id) => {
	return new Promise((resolve, reject) => {

		userModel.findUserById(id, user_id)
			.then((res) => { resolve(res); })
			.catch((err) => { reject(err); })
	});
}

exports.authenticate = (data) => {
	return new Promise((resolve, reject) => {
		inputModel.username(data.username)
			.then(() => {
				return inputModel.password(data.password)
			})
			.then(() => {
				console.log("hello authenticate");
				return userModel.findUserByUsername(data.username, 0);
			})
			.then((result) => {
				if (!result.mailValidation) {
					reject({ "status": "error", "key": "mailActivation", "msg": "mail not validate" });
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
							age: result.age,
							avatar: result.avatar
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
		userModel.findUserByEmail(data, 0)
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
		if (pwd != confirmPwd) {
			reject({ "status": "error password difference" });
			return;
		}

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
				reject({ "status": "error", "msg": "id invalid" });
			})
	})
}

exports.update = (data, id) => {
	return new Promise((resolve, reject) => {

		let validKeys = [
			'username',
			'firstname',
			'lastname',
			'email',
			'orientation',
			'gender',
			'age',
			'bio',
			'ageMin',
			'ageMax',
			'distance',
			'location',
			'latitude',
			'longitude'
		]
		// if (!(data.password || data.confirmation) && data.password !== data.confirmation)
		// 	reject({ status: 'error', code: 400, key: "password", msg: 'Password not confirm' });
		// else
		// 	delete data['confirmation'];


		for (let elem in data) {
			if (!validKeys.includes(elem)) {
				reject({ status: 'error', msg: 'Unhautorized key in data' });
				return;
			}
		}

		userModel.checkDataUpdate(data, id)
			.then(() => { return userModel.update(data, id); })
			.then((res) => { resolve(res); })
			.catch((err) => {
				reject({ status: "error", data: err });
			})
	})
}

exports.changeEmail = (token) => {
	return new Promise((resolve, reject) => {

		jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (err)
				reject({ status: 'error', msg: 'Token false !' });
			else {
				console.log(decoded);
				console.log('decode Ok !');

				userModel.changeEmail(decoded.id, decoded.email)
					.then((result) => {
						console.log('OK');
						resolve();
					})
					.catch(() => {
						console.log('ERROR 457');
						reject();

					})

			}
		});

		// resolve();
	})
}
