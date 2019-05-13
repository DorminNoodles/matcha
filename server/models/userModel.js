const mysql = require('promise-mysql');
var sql = require('mysql');
const bcrypt = require('bcrypt');
const myEmitter = require('../emitter');

exports.findUserByUsername = (username) => {
	return new Promise((resolve, reject) => {
		console.log("findUserByUsername");
		mysql.createConnection({
			port: 3307,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			console.log("findUserByUsername");
			var result = conn.query('SELECT username, id, mailValidation, email FROM users WHERE username=?', [username]);
			conn.end();
			return result;
		}).then((result) => {
			console.log("***************");
			console.log(result);
			if (result[0])
				resolve(result[0]);
			else {
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
			port: 3307,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT username, id, email FROM users WHERE email=\''+ email +'\'');
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
				port: 3307,
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
			port: 3307,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT * FROM users WHERE id=\''+ id +'\'');
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
			port: 3307,
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		}).then((conn) => {
			let result = conn.query('SELECT password FROM users WHERE username=?', [username]);
			return result;
		}).then((result) => {
			console.log("hello");
			bcrypt.compare(password, result[0].password)
			.then((res) => {
				if (res)
					resolve(res);
				else
					reject();
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
			port: 3307,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
		.then ((conn) => {
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
			port: 3307,
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		})
		.then((conn) => {
			console.log("PUTAIN DE MERDE");
			let query = conn.query('UPDATE users SET mailValidation=? WHERE email=? AND username=?', [true, email, username]);
			conn.end();
			return query;
		})
		.then((res) => {
			console.log(res);
			resolve({"status": "success", "msg": "UserActivated !"});
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
			port: 3307,
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		})
		.then((conn) => {
			console.log("PUTAIN DE MERDE");
			return conn.query('UPDATE users SET password=? WHERE email=? AND username=?', [pwd, email, username]);
		})
		.then((res) => {
			resolve({"status": "success", "msg": "Password changed!"});
		})
		.catch((err) => {
			console.log("Error !");
			reject({status: "error", msg: "error db !"});
		})
	});
}
