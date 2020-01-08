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
			inputModel.usernameAlreadyTaken(data.username, 0).catch(e => e),
			inputModel.password(data.password).catch(e => e),
			inputModel.firstname(data.firstname).catch(e => e),
			inputModel.lastname(data.lastname).catch(e => e),
			inputModel.email(data.email).catch(e => e),
			inputModel.emailAlreadyTaken(data.email, 0).catch(e => e),
			inputModel.location(data.location, data.latitude, data.longitude).catch(e => e),
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
		}).catch((err) => { reject(err); })
	})
}

exports.checkDataUpdate = (data, id) => {
	return new Promise((resolve, reject) => {

		let filter = [];

		for (let elem in data)
			filter.push(elem);

		Promise.all([
			inputModel.username(data.username).catch(e => e),
			inputModel.usernameAlreadyTaken(data.username, id).catch(e => e),
			inputModel.firstname(data.firstname).catch(e => e),
			inputModel.lastname(data.lastname).catch(e => e),
			inputModel.email(data.email).catch(e => e),
			inputModel.emailAlreadyTaken(data.email, id).catch(e => e),
			inputModel.location(data.location, data.latitude, data.longitude).catch(e => e),
			inputModel.gender(data.gender).catch(e => e),
			inputModel.age(data.age).catch(e => e),
			inputModel.orientation(data.orientation).catch(e => e),
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

			Object.entries(errors).length ? reject(errors) : resolve();

		}).catch((err) => { reject(err); })
	})
}

exports.findUser = (id) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return conn.query('SELECT username, id, email, gender, orientation, \
					location, latitude, longitude, age, avatar, ageMin, ageMax,	distance, identity \
					FROM users WHERE id=? ', [id])
					.then((result) => {
						conn.end();

						if (result[0]) { resolve(result[0]); }
						else
							reject({ "status": "error", "msg": "User does not exist" });
					})
			})
			.catch(() => {
				reject({ "status": "error", "msg": "Internal Server Error" });
			})
	})
}

exports.findUserByUsername = (username, id) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				let rsl = conn.query('SELECT username, id, mailValidation, email, \
									gender, orientation, location, latitude, \
									longitude, age, avatar, ageMin, ageMax, distance, identity,\
									IF((SELECT id FROM ban WHERE id=users.id), TRUE, FALSE) as ban \
									FROM users WHERE username=? AND id NOT IN (?)', [username, id])
				conn.end();
				return rsl;
			})
			.then((result) => {
				result[0] ? resolve(result[0]) :
					reject({ "status": "error", "key": "user", "msg": "User does not exist" });
			}).catch((error) => {
				reject({ "status": "error", "key": "connected", "msg": "Internal Server Error" });
			})
	})
}

exports.findUserByEmail = (email, id) => {

	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				let rsl = conn.query('SELECT username, id, email \
									FROM users WHERE email=? AND id NOT IN (?)', [email, id]);
				conn.end();
				return rsl;
			}).then((result) => {
				result[0] ? resolve(result[0]) : reject();
			}).catch((error) => { reject(error); })
	})
}

exports.saveUser = (data) => {
	return new Promise((resolve, reject) => {

		bcrypt.hash(data.password, 10)
			.then((hash) => {
				data.password = hash;
				return database.connection();
			})
			.then((conn) => {
				let rsl = conn.query("INSERT INTO users SET ?", data);
				conn.end()
				return rsl
			})
			.then((res) => { resolve({ status: "success", id: res.insertId }); })
			.catch((err) => { reject(err); })
	})
}

exports.findUserById = (id, user_id) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return conn.query('SELECT id, username, firstname, lastname, email, gender, orientation,\
				 bio, age, distance, ageMin, ageMax, avatar, location, latitude, longitude, active,\
				 IF((SELECT * FROM ban WHERE id=?), TRUE, FALSE ) as ban, \
				((SELECT COUNT(*) FROM likes WHERE likes.liked=users.id) * 10) + \
				((SELECT COUNT(*) FROM usertags WHERE tag_id IN \
				(SELECT tag_id FROM usertags WHERE user_id=users.id)) * 5) as score,\
				COUNT(liked) as nb_likes,\
				IF(report.reported=users.id, TRUE, FALSE) as report,\
				IF((SELECT count(*) FROM likes WHERE liker=? and liked=?) = 1, TRUE, FALSE) as likes\
				FROM users \
				LEFT JOIN report ON(report.reported=? AND report.reporting=?)\
				LEFT JOIN likes ON (likes.liked=?) \
				WHERE id =? ', [id, user_id, id, id, user_id, id, id])
					.then((result) => {
						conn.end();
						result[0] ? resolve(result[0]) : reject();
					})
			}).catch((error) => { reject(error); })
	})
}

exports.checkLogin = (username, password) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				conn.query('SELECT password FROM users WHERE username=?', [username])
					.then((result) => {
						conn.end()
						bcrypt.compare(password, result[0].password)
							.then((res) => {
								if (res)
									this.setActive(username)
										.then((res) => { resolve(res) })
										.catch((error) => { reject(error); })
								else
									reject({ "status": "error", "key": "password", "msg": "Wrong password" });

							})
					})
			}).catch(() => { reject({ "status": "error" }); })
	})
}

exports.setActive = (username, password) => {
	return new Promise((resolve, reject) => {

		database.connection().then((conn) => {
			conn.query('UPDATE users SET active=null WHERE username=?', [username])
				.then(() => {
					conn.end();
					resolve({ "status": "success" })
				})
				.catch((error) => { reject({ "status": "error" }) })
		})
	})
}

exports.activateUser = (username, email) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				let query = conn.query('UPDATE users SET mailValidation=? WHERE email=? AND username=?', [true, email, username]);
				conn.end();
				return query;
			})
			.then((res) => { resolve({ "status": "success", "msg": "UserActivated !" }); })
			.catch((err) => { reject(err); })
	})
}

exports.changePwd = (email, username, pwd) => {
	return new Promise((resolve, reject) => {
		database.connection().then((conn) => {
			let rsl = conn.query('UPDATE users SET password=?, tmp_email=null WHERE email=? AND username=?', [pwd, email, username])
			conn.end();
			return rsl
		})
			.then(() => { resolve({ "status": "success", "msg": "Password changed!" }); })
			.catch(() => { reject({ status: "error", msg: "error db !" }); })
	});
}

exports.update = (data, id) => {
	return new Promise((resolve, reject) => {

		database.connection()
			.then((conn) => {
				return conn.query('UPDATE users SET ? WHERE id=?', [data, id])
					.then(() => {
						conn.end();

						return this.findUser(id)
					})
			})
			.then((data) => {

				if (data)
					resolve({ "status": "success", "msg": "update user", data });
				else
					reject({ status: "error", msg: "update failed" });
			})
			.catch((err) => { reject(err); })
	})
}

exports.logout = (id) => {
	return new Promise((resolve, reject) => {

		var d = new Date();
		database.connection()
			.then((conn) => {
				conn.query('UPDATE users SET active=? WHERE id=?', [d, id])
					.then(() => {
						conn.end()
						resolve({ "status": "success" });
					})
			})
			.catch((err) => {
				reject({ "status": "error" });
			})
	})
}

exports.setKeyPassword = (key, id) => {
	return new Promise((resolve, reject) => {

		database.connection()
			.then((conn) => {
				return conn.query('UPDATE users SET tmp_email=? WHERE id=?', [key, id])
					.then(() => {
						conn.end();
						resolve({ "status": "success" });
					})
			})
			.catch(() => { reject({ "status": "error" }); })
	})
}

exports.checkKeyPassword = (key, id, useKey) => {
	return new Promise((resolve, reject) => {
		if (useKey === false)
			resolve({ "status": "success" });
		else
			database.connection()
				.then((conn) => {
					let rsl = conn.query('SELECT tmp_email FROM users WHERE tmp_email=? AND id=? HAVING COUNT(*)=1', [key, id])
					conn.end();
					return rsl
						.then((res) => {
							if (res && res.length > 0)
								resolve({ "status": "success" });
							else
								reject({ "status": "error", "msg": "key email not valid" });
						})
				}).catch(() => { reject({ "status": "error", "msg": "Internal Server Error" }); })
	})
}