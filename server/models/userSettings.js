const mysql = require('promise-mysql');
const check = require('../services/checkInput');
const mailAvailable = require('../controllers/user');

// exports.changeUsername = (id, username) => {
// 	return new Promise((resolve, reject) => {
// 		check.username(username)
// 		.then((res) => {
// 			check.usernameAlreadyTaken(username)
// 			.then((res) => {
// 				return check.usernameAlreadyTaken(username);
// 			}).catch((error) => {
// 				if (res == username)
// 					resolve();
// 			})
// 		})
// 		.then(() => {
// 			return mysql.createConnection({
// 					host: 'localhost',
// 					user: 'root',
// 					password: 'qwerty',
// 					database: 'matcha'
// 				}).then((conn) => {
// 					var result = conn.query('UPDATE users SET username=\''+ username +'\' WHERE id=\''+ id +'\'');
// 					conn.end();
// 				}).catch((error) => {
// 					reject(error);
// 				})
// 		}).then(() => {
// 			resolve();
// 		})
// 		.catch((error) => {
// 			reject(error);
// 		})
// 	})
// }

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
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
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

exports.changePassword = (id, password, newPass, newPassConfirm) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = ('SELECT password FROM users WHERE id=\''+ id +'\'');
			conn.end();
		}).then((result) => {
			if (result.localeCompare(password) == 0) {
				check.password(newPass);
				if (newPass.localeCompare(newPassConfirm) == 0) {
					var renewPass = ('UPDATE users SET password=\''+ newPass +'\'');
					resolve();
				}
			}
		}).catch((error) => {
			reject(error);
		})
	})
}