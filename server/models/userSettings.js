const mysql = require('promise-mysql');
const bcrypt = require('bcrypt');
const check = require('../services/checkInput');
const mailAvailable = require('../controllers/user');

exports.changeFirstname = (id, firstname) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('UPDATE users SET firstname=\''+ firstname +'\' WHERE id=\''+ id +'\'');
			conn.end();
			resolve();
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.changeLastname = (id, lastname) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('UPDATE users SET lastname=\''+ lastname +'\' WHERE id=\''+ id +'\'');
			conn.end();
			resolve();
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.changeOrientation = (id, gender) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('UPDATE users SET gender=\''+ gender +'\' WHERE id=\''+ id +'\'');
			conn.end();
			resolve();
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.changeMail = (id, email) => {
	return new Promise((resolve, reject) => {
		mailAvailable.checkEmailAvailability(id, email)
		.then((result) => {
			return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
			})
		})
		.then((conn) => {
			return conn.query('UPDATE users SET email=? WHERE id=?', [email, id])
		})
		.then((res) => {
			resolve(res);
		})
		.catch((err) => {
			reject(err);
		})
	})
}

exports.changeBio = (id, bio) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('UPDATE users SET bio=\''+ bio +'\' WHERE id=\''+ id +'\'');
			conn.end();
			resolve();
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.changeGender = (id, gender) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('UPDATE users SET gender=\''+ gender +'\' WHERE id=\''+ id +'\'');
			conn.end();
			resolve();
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.changeOrientation = (id, orientation) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('UPDATE users SET orientation=\''+ orientation +'\' WHERE id=\''+ id +'\'');
			conn.end();
			resolve();
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.changeLocation = (id, location) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('UPDATE users SET location=\''+ location +'\' WHERE id=\''+ id +'\'');
			conn.end();
			resolve();
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.getPassFromID = (id) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			return conn.query('SELECT password FROM users WHERE id=\''+ id +'\'');
			conn.end();
		}).then((res) => {
			resolve(res[0].password);
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.changePassword = (id, password, newPass, newPassConfirm) => {
	return new Promise((resolve, reject) => {
		this.getPassFromID(id)
		.then((result) => {
			bcrypt.compare(password, result)
			.then((res) => {
				if (res == true) {
					check.password(newPass);
					if (newPass.localeCompare(newPassConfirm) == 0) {
						bcrypt.hash(newPass, 10)
						.then((hash) => {
							pass = hash;
							return mysql.createConnection({
								host: 'localhost',
								user: 'root',
								password: 'qwerty',
								database: 'matcha'
							})
						}).then((conn) => {
							return conn.query('UPDATE users SET password=\''+ pass +'\' WHERE id=\''+ id +'\'');
							resolve();
						})
					}
				}
				else
					reject(error);
			}).catch((error) => {
				reject(error);
			})
		}).catch((error) => {
			reject(error);
		})
	})
}