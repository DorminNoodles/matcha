// const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const myEmitter = require('../emitter');
const database = require('./database');
const events = require('events');

const userModel = require('../models/userModel');
const inputModel = require('../models/inputModel');

new events.EventEmitter();
require('dotenv').config();

const avatarUpload = (data, id) => {
	return new Promise((resolve, reject) => {
		if (!data.avatar || !data.avatar.mv) {
			reject({ status: "error", key: "avatar", msg: "Avatar upload error !" })
			return;
		}

		let name = data.avatar.name.toLowerCase()
		data.avatar.mv('public/pictures/' + id + '/' + name, (err) => {
			if (err)
				reject({ status: "error", key: "avatar", msg: "Avatar upload error !" });
			else {
				let avatar = process.env.REACT_APP_PUBLIC + id + "/" + name

				database.connection().then((conn) => {
					conn.query('UPDATE users SET avatar=? WHERE id=?', [avatar, id])
						.then(() => {
							conn.end();
							resolve({ "status": "success" })
						}).catch(() => { reject({ "status": "error" }) })
				})
			}
		})
	})
}

exports.identity = (gender, orientation) => {

	let identity = 000000
	let mask = 000000

	if (gender === "male")
		identity = orientation === "heterosexual" ? 17 : orientation === "homosexual" ? 10 : 27;
	else if (gender === "female")
		identity = orientation === "heterosexual" ? 34 : orientation === "homosexual" ? 5 : 39;


	if (gender === "male")
		mask = orientation === "heterosexual" ? 32 : orientation === "homosexual" ? 8 : 2;
	else if (gender === "female")
		mask = orientation === "heterosexual" ? 16 : orientation === "homosexual" ? 4 : 1;

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
				resolve({ status: 'success', msg: "user created" });
				return userModel.saveUser({
					...data,
					...binary,
					avatar: data.avatar.name
				});
			})
			.then((res) => { return avatarUpload(data, res.id); })
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
		inputModel.username(data.username).then(() => {
			inputModel.password(data.password).then((res) => {
				userModel.findUserByUsername(data.username, 0).then((result) => {
					if (!result.mailValidation) {
						reject({ "status": "error", "key": "mailActivation", "msg": "mail not validate" });
						return;
					}
					else if (result.ban === 1)
						resolve({ status: 'error', msg: 'ban' });
					else
						userModel.checkLogin(data.username, data.password)
							.then(() => {
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
									avatar: result.avatar,
									ageMin: result.ageMin,
									ageMax: result.ageMax,
									distance: result.distance,
									identity: result.identity
								};

								resolve({ status: 'success', msg: 'connected !', ...datas });
							}).catch((err) => { reject(err); })
				}).catch((err) => { reject(err); })
			}).catch((err) => { reject(err); })
		}).catch((err) => { reject(err); })
	})
}

exports.forgot = (data) => {
	return new Promise((resolve, reject) => {

		userModel.findUserByEmail(data, 0)
			.then((res) => {
				var key = Math.floor(Math.random() * 900000000) + 100000000;
				userModel.setKeyPassword(key, res.id).then(() => {
					var token = jwt.sign({
						id: res.id,
						username: res.username,
						email: res.email
					}, process.env.JWT_KEY);

					myEmitter.emit('forgotPass', {
						username: res.username,
						email: res.email
					}, key, token);

					resolve({ "status": "success" });
				})
			}).catch(() => { reject(); })
	})
}

exports.updatePassword = ({ token, password, confirmPassword, id, key, useKey }) => {
	return new Promise((resolve, reject) => {

		let passCrypted;
		if (password !== confirmPassword)
			reject({ "status": "error", "msg": "Password and confirmation does not match" });

		console.log(token, password, confirmPassword, id, key, useKey)
		userModel.checkKeyPassword(key, id, useKey)
			.then(() => {
				inputModel.password(password)
					.then(() => {
						try {
							bcrypt.hash(password, 10)
								.then((hash) => {
									passCrypted = hash;
									return jwt.verify(token, process.env.JWT_KEY);
								})
								.then((decoded) => {
									return userModel.changePwd(decoded.email, decoded.username, passCrypted)
										.then(() => { resolve({ "status": "success", "msg": "The password is successfully change " }); })
										.catch((err) => { reject(err); })
								})
						}
						catch (error) { reject(error); }

					}).catch((err) => { reject(err); })
			}).catch((err) => {
				err.msg === "key email not valid" ? resolve(err) : reject(err);
			})
	})
}

exports.activate = (token) => {
	return new Promise((resolve, reject) => {
		let decoded = jwt.verify(token, process.env.JWT_KEY);
		userModel.activateUser(decoded.username, decoded.email)
			.then((res) => { resolve(res); })
			.catch((err) => { reject(err); })
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

		let binary = this.identity(data.gender, data.orientation)

		for (let elem in data) {
			if (!validKeys.includes(elem)) {
				reject({ status: 'error', msg: 'Unhautorized key in data' });
				return;
			}
		}

		userModel.checkDataUpdate(data, id)
			.then(() => { return userModel.update({ ...data, ...binary }, id) })
			.then((res) => { resolve(res); })
			.catch((err) => { reject({ status: "error", data: err }); })
	})
}

exports.logout = (id) => {
	return new Promise((resolve, reject) => {
		userModel.logout(id)
			.then((res) => resolve(res))
			.catch((err) => reject(err))
	})
}