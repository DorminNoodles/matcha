const mysql = require('promise-mysql');
var sql = require('mysql');
const bcrypt = require('bcrypt');
const myEmitter = require('../emitter');
// const checkInput = require('../services/checkInput');
const inputModel = require('../models/inputModel');

exports.checkData = (data) => {
	return new Promise((resolve, reject) => {
		console.log("CHECK DATA");

		let error = false;
		let json = {
			'username': '',
			'password': '',
			'confirmPwd': '',
			'firstname': '',
			'lastname': '',
			'location': '',
			'email': '',
			'avatar': '',
			'gender': '',
			'orientation': '',
			'age': '',
			'age_min': '',
			'age_max': '',
			'distance': '',
			'bio': '',
		};

		Promise.all([
			inputModel.username(data.username).catch(e => e),
			inputModel.usernameAlreadyTaken(data.username).catch(e => e),
			inputModel.password(data.password).catch(e => e),
			inputModel.firstname(data.firstname).catch(e => e),
			inputModel.lastname(data.lastname).catch(e => e),
			inputModel.email(data.email).catch(e => e),
			inputModel.emailAlreadyTaken(data.email).catch(e => e),
			inputModel.location(data.location).catch(e => e),
			inputModel.avatar(data.avatar).catch(e => e),
			// inputModel.ageRange(data.age_min, data.age_max).catch(e => e),
			// inputModel.bio(data.bio).catch(e => e),
			// inputModel.age(data.age).catch(e => e),
		]).then((res) => {
			res.map((elem) => {
				if (elem.status === 'success' && elem.key)
					json[elem.key] = elem.msg;
				else if (elem.status === 'error') {
					error = true;
					json[elem.key] = elem.msg;
				}
			});
			if (error)
				reject(json);
			else
				resolve();
		});

	})
}

exports.findUserByUsername = (username) => {
	return new Promise((resolve, reject) => {
		console.log("findUserByUsername");
		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT \
									username,\
									id, \
									mailValidation, \
									email, \
									gender, \
									orientation, \
									location, \
									latitude, \
									longitude, \
									age \
									FROM users WHERE username=?', [username]);
			conn.end();
			return result;
		}).then((result) => {
			if (result[0]) { resolve(result[0]); }
			else { reject({ "status": "error", "key": "user", "msg": "User does not exist" }); }
		}).catch((error) => {
			reject({ "status": "error", "key": "connected", "msg": "Internal Server Error" });
		})
	})
}

exports.findUserByEmail = (email) => {
	return new Promise((resolve, reject) => {

		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT username, id, email FROM users WHERE email=\'' + email + '\'');
			conn.end();
			return result;
		}).then((result) => {
			if (result[0])
				resolve(result[0]);
			else
				reject();
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.saveUser = (data) => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(data.password, 10)
			.then((hash) => {
				data.password = hash;
				return mysql.createConnection({
					port: process.env.PORT,
					host: 'localhost',
					user: 'root',
					password: 'qwerty',
					database: 'matcha'
				})
			})
			.then((conn) => {
				return conn.query("INSERT INTO users (username, password, firstname, lastname, email, gender, orientation, age_min, age_max, distance, bio, age)\
					VALUES ('" + data.username + "', '" + data.password + "', '" + data.firstname + "',\
					'" + data.lastname + "', '" + data.email + "', '" + data.gender + "', '" + data.orientation + "',\
					'" + data.age_min + "', '" + data.age_max + "', '" + data.distance + "', '" + data.bio + "', '" + data.age + "')");
			})
			.then((res) => {
				resolve('User saved');
			})
			.catch((err) => {
				reject({ "status": "error", "key": "database", "msg": "Connexion error !" });
			})
	})
}

exports.findUserByID = (id) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT * FROM users WHERE id=\'' + id + '\'');
			conn.end();
			return (result);
		}).then((result) => {
			if (result[0])
				resolve(result[0]);
			else
				reject();
		}).catch((error) => {
			console.log("findUserByName failed");
			reject(error);
			return;
		})
	})
}

exports.checkLogin = (username, password) => {
	console.log("hello");
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			let result = conn.query('SELECT password FROM users WHERE username=?', [username]);
			return result;
		}).then((result) => {
			bcrypt.compare(password, result[0].password)
				.then((res) => {
					if (res)
						resolve(res);
					else
						reject({ "status": "error", "key": "password", "msg": "Wrong password" });
				}).catch((error) => {
					reject();
					console.log(error);
				})
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.saveGps = (id, long, lat) => {
	return new Promise((resolve, reject) => {
		console.log("BORDELLLLLL");
		console.log(id, long, lat);
		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
			.then((conn) => {
				return conn.query("UPDATE users SET latitude=?, longitude=? WHERE id=?", [long, lat, id]);
			})
			.then((res) => {
				resolve('Gps saved');
			})
			.catch((err) => {
				console.log("ERRRO");
				reject(err);
			})
	})
}

exports.activateUser = (username, email) => {
	return new Promise((resolve, reject) => {
		console.log("hello");
		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
			.then((conn) => {
				console.log("PUTAIN DE MERDE");
				let query = conn.query('UPDATE users SET mailValidation=? WHERE email=? AND username=?', [true, email, username]);
				conn.end();
				return query;
			})
			.then((res) => {
				console.log(res);
				resolve({ "status": "success", "msg": "UserActivated !" });
			})
			.catch((err) => {
				console.log("ERROR ++++++++++++++++++++++++");
				reject(err);
			})
	})
}

exports.changePwd = (email, username, pwd) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
			.then((conn) => {
				console.log("PUTAIN DE MERDE");
				return conn.query('UPDATE users SET password=? WHERE email=? AND username=?', [pwd, email, username]);
			})
			.then((res) => {
				resolve({ "status": "success", "msg": "Password changed!" });
			})
			.catch((err) => {
				console.log("Error !");
				reject({ status: "error", msg: "error db !" });
			})
	});
}
