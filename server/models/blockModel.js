const mysql = require('promise-mysql');
const userModel = require('../models/userModel');

exports.new = (blocker, blocked) => {
	return new Promise((resolve, reject) => {

		userModel.findUserById(blocked, blocker).then((res) => {
			mysql.createConnection({
				port: process.env.PORT,
				host: 'localhost',
				user: 'root',
				password: 'qwerty',
				database: 'matcha'
			}).then((conn) => {
				return conn.query('INSERT INTO block (`blocker`, `blocked`) \
							VALUES ( ?, ?)', [blocker, blocked]);
			}).then((res) => {
				resolve({ "status": "success", "msg": "block success" });
			}).catch((err) => {
				reject({ "status": "error", "msg": "error db" });
			})
		}).catch((err) => {
			reject({ "status": "error", "msg": "user not exist" });
		})
	})
}

exports.get = (blocker, blocked) => {
	return new Promise((resolve, reject) => {

		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
			.then((conn) => {
				return conn.query('SELECT * FROM block WHERE blocker=? AND blocked=?', [blocker, blocked]);
			})
			.then((res) => {
				console.log(res)
				if (res[0])
					resolve(res[0]);
				else
					reject('Block not found.');
			})
			.catch((err) => {
				console.log(err);
				reject();
			})
	})
}
