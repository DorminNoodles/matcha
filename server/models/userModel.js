const mysql = require('promise-mysql');
var sql = require('mysql');
const bcrypt = require('bcrypt');
const myEmitter = require('../emitter');
const inputModel = require('../models/inputModel');

const database = require('../controllers/database');

exports.checkDataNew = (data) => {
	return new Promise((resolve, reject) => {
		Promise.all([
			inputModel.username(data.username).catch(e => e),
			inputModel.usernameAlreadyTaken(data.username).catch(e => e),
			inputModel.password(data.password).catch(e => e),
			inputModel.firstname(data.firstname).catch(e => e),
			inputModel.lastname(data.lastname).catch(e => e),
			inputModel.email(data.email).catch(e => e),
			inputModel.emailAlreadyTaken(data.email).catch(e => e),
			// inputModel.location(data.location).catch(e => e),
			inputModel.gender(data.gender).catch(e => e),
			inputModel.age(data.age).catch(e => e),
			inputModel.orientation(data.orientation).catch(e => e),
			inputModel.avatar(data.avatar).catch(e => e),
			inputModel.bio(data.bio).catch(e => e),
			inputModel.ageRange(data.ageMin, data.ageMax).catch(e => e),
			inputModel.distance(data.distance).catch(e => e),
		]).then((res) => {
			let errors = {};

			res.forEach((elem) => {
				if (elem.status && elem.status === 'error')
					errors[elem.key] = elem.msg;
			})

			Object.entries(errors).length ? reject(errors) : resolve();
		}).catch((err) => {
			console.log(err);
			reject(err);
		})
	})
}

exports.checkDataUpdate = (data) => {
	return new Promise((resolve, reject) => {
		console.log("CHECK DATA");
		console.log("data ->> ", data);

		let filter = [];

		for (let elem in data) {
			filter.push(elem);
		}

		Promise.all([
			inputModel.username(data.username).catch(e => e),
			inputModel.usernameAlreadyTaken(data.username).catch(e => e),
			inputModel.password(data.password).catch(e => e),
			inputModel.firstname(data.firstname).catch(e => e),
			inputModel.lastname(data.lastname).catch(e => e),
			inputModel.email(data.email).catch(e => e),
			inputModel.emailAlreadyTaken(data.email).catch(e => e),
			inputModel.location(data.location).catch(e => e),
			inputModel.gender(data.gender).catch(e => e),
			inputModel.age(data.age).catch(e => e),
			inputModel.orientation(data.orientation).catch(e => e),
			inputModel.avatar(data.avatar).catch(e => e),
			inputModel.bio(data.bio).catch(e => e),
			inputModel.ageRange(data.ageMin, data.ageMax).catch(e => e),
			inputModel.distance(data.distance).catch(e => e),
		]).then((res) => {
			let errors = {};

			res.forEach((elem) => {
				if (elem.status && elem.status === 'error') {
					if (filter.includes(elem.key))
						errors[elem.key] = elem.msg;
				}
			})

			// console.log('errors  ', errors);
			// errors.username = 'fuck';

			Object.entries(errors).length ? reject(errors) : resolve();
		}).catch((err) => {
			console.log(err);
			reject(err);
		})
	})
}

// exports.checkData = (data) => {
// 	return new Promise((resolve, reject) => {
// 		console.log("CHECK DATA");
// 		console.log("data ->> ", data);
//
// 		let error = false;
// 		let json = {};
//
// 		Promise.all([
// 			inputModel.username(data.username).catch(e => e),
// 			inputModel.usernameAlreadyTaken(data.username).catch(e => e),
// 			inputModel.password(data.password).catch(e => e),
// 			inputModel.firstname(data.firstname).catch(e => e),
// 			inputModel.lastname(data.lastname).catch(e => e),
// 			inputModel.email(data.email).catch(e => e),
// 			inputModel.emailAlreadyTaken(data.email).catch(e => e),
// 			inputModel.location(data.location).catch(e => e),
// 			inputModel.gender(data.gender).catch(e => e),
// 			inputModel.age(data.age).catch(e => e),
// 			inputModel.orientation(data.orientation).catch(e => e),
// 			inputModel.avatar(data.avatar).catch(e => e),
// 			inputModel.bio(data.bio).catch(e => e),
// 			inputModel.ageRange(data.ageMin, data.ageMax).catch(e => e),
// 			inputModel.distance(data.distance).catch(e => e),
// 		]).then((res) => {
// 			res.forEach((elem) => {
// 				if (elem.status && elem.status === 'error') {
// 					json[elem.key] = elem.msg;
// 					error = true;
// 				}
// 			})
//
// 			console.log(json);
//
// 			if (error)
// 				reject(json);
// 			else
// 				resolve({status: "success", key: "checkData"});
// 		}).catch((err) => {
// 			console.log(err);
// 			reject(err);
// 		})
// 		console.log("ENDOOOO");
// 	})
// }

exports.findUserByUsername = (username) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
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
									age, \
									avatar \
									FROM users WHERE username=?', [username]);
				conn.end();
				return result;
			}).then((result) => {
				if (result[0])
					resolve(result[0]);
				else
					reject({ "status": "error", "key": "user", "msg": "User does not exist" });
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
				console.log('hash password > ', hash);
				data.password = hash;
				return database.connection();
			})
			.then((conn) => {
				return conn.query("INSERT INTO users SET ?", data);
			})
			.then((res) => {
				console.log('query database > ', res);
				resolve('User saved');
			})
			.catch((err) => {
				console.log('catch >', err);
				reject(err);
			})
	})
}

exports.findUserById = (id, user_id) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				var result = conn.query(`\
				SELECT id, username, firstname, lastname, gender, orientation, bio, age, location, avatar, score,
				COUNT(liked) as nb_likes,
				IF((SELECT count(*) FROM likes WHERE liker=${user_id} and liked=${id}) = 1, TRUE, FALSE) as likes
				FROM users LEFT JOIN likes ON(likes.liked=${id}) WHERE id=${id};`)
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

exports.update = (id, data) => {
	return new Promise((resolve, reject) => {
		console.log('### UPDATEUSER ###');

		if (data.email) {
			console.log('faire quelque chose');
			data.tmp_email = data.email;
			delete data['email'];
		}

		database.connection()
			.then((conn) => {
				return conn.query('UPDATE users SET ? WHERE id=?', [data, id]);
			})
			.then((res) => {

				if (res.affectedRows == 1) {
					console.log('QUERY SUCCESS');
					myEmitter.emit('userUpdate', { ...data, id });
					resolve();;
				}
				else {
					reject({ status: "error", msg: "User not found !" });
				}
			})
			.catch((err) => {
				console.log(err);
				reject({ status: "error", code: 502, msg: 'database error !' });
			})
	})
}

exports.changeEmail = (id, tmp_email) => {
	return new Promise((resolve, reject) => {

		console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

		database.connection()
			.then((conn) => {
				return conn.query('UPDATE users SET ? WHERE id=?', [{ "email": tmp_email }, id]);
			})
			.then((conn) => {
				resolve();
			})
			.catch((err) => {
				console.log(err)
				reject();
			})
	})
}
