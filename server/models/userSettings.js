const mysql = require('promise-mysql');
const check = require('../services/checkInput');

exports.changeUsername = (id, username) => {
	return new Promise((resolve, reject) => {
		check.username(username)
		.then(() => {
			check.usernameAlreadyTaken(username)
		}).then(() => {
			mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'qwerty',
				database: 'matcha'
			})
		}).then((conn) => {
			var result = conn.query('UPDATE users SET username=\''+ username +'\' WHERE id=\''+ id +'\'');
			conn.end();
			resolve();
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.changeFirstname = (id, firstname) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('UPDATE users SET firstname=\''+ firstname +'\' WHERE id=\''+ id +'\'');
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
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.changeMail = (id, email) => {
	return new Promise((resolve, reject) => {
		check.email(email)
		.then(() => {
			check.emailAlreadyTaken(email)
		}).then(() => {
			mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'qwerty',
				database: 'matcha'
			})
		}).then((conn) => {
			var result = conn.query('UPDATE users SET email=\''+ email +'\' WHERE id=\''+ id +'\'');
			conn.end();
			resolve();
		}).catch((error) => {
			reject(error);
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
			
		})
	})
}