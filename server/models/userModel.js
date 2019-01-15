const mysql = require('promise-mysql');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

exports.findUserByUsername = (username) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT username FROM users WHERE username=\''+ username +'\'');
			conn.end();
			return result;
		}).then((result) => {
			if (result[0])
				resolve();
			else {
				console.log("IS NOT HERE");
				reject();
			}
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.findUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT * FROM users WHERE email=\''+ email +'\'');
			conn.end();
			return result;
		}).then((result) => {
			if (result[0]){
				console.log("OK");
				resolve(email);
			}
			else{
				console.log("KO");
				reject();
			}
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
					host: 'localhost',
					user: 'root',
					password: 'qwerty',
					database: 'matcha'
				})
		})
		.then ((conn) => {
			return conn.query("INSERT INTO users (username, password, firstname, lastname, email, gender, orientation)\
					VALUES ('" + data.username + "', '" + data.password + "', '" + data.firstname + "',\
					'" + data.lastname + "', '" + data.email + "', '" + data.gender + "', '" + data.orientation + "')");
		})
		.then((res) => {
			resolve('User saved');
		})
		.catch((err) => {
			reject(err);
		})
	})
}

exports.findUserByID = (id) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT * FROM users WHERE id=\''+ id +'\'');
			conn.end();
			return (result);
		}).then((result) => {
			resolve(result);
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.checkLogin = (data, response) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT password FROM users WHERE username=\''+ data.username +'\'');
			return result;
		}).then((result) => {
			bcrypt.compare(data.password, result[0].password).then((res) => {
				if (res) {
					resolve(response);
				}
				else{
					reject();
				}
			}).catch((error) => {
				reject();
				console.log(error);
			})
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.forgotPassword = (data) => {
	return new Promise((resolve, reject) => {
		findUserByEmail(data)
		.then(() => {
			console.log("YOP");
			var key = Math.floor(Math.random()*900000000) + 100000000;
			bcrypt.hash(key.toString(), 10);
		}).then((hash) => {
			console.log(hash);
			return mysql.createConnection({
					host: 'localhost',
					user: 'root',
					password: 'qwerty',
					database: 'matcha'
			})
		}).then((conn) => {
			resolve();
			conn.end();
			return conn.query('UPDATE users SET password=\''+ hash +'\' WHERE email=\''+ data.email +'\'');
		}).catch((error) => {
			reject(error);
		})
	})
}
