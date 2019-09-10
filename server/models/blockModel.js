const mysql = require('promise-mysql');
const userModel = require('../models/userModel');
const database = require('../controllers/database');

exports.new = (blocker, blocked) => {
	return new Promise((resolve, reject) => {

		userModel.findUserById(blocked, blocker).then((res) => {
			database.connection()
				.then((conn) => {
					return conn.query('INSERT INTO block (`blocker`, `blocked`) \
							VALUES ( ?, ?)', [blocker, blocked]).then(() => {
						return conn.query('UPDATE userschat SET active=0 \
									 WHERE first_user=LEAST(?, ?) \
									 AND second_user=GREATEST(?, ?)'
							, [blocker, blocked, blocker, blocked]);
					})
				}).then(() => {
					resolve({ "status": "success", "msg": "block success" });
				}).catch(() => {
					reject({ "status": "error", "msg": "error db" });
				})
		}).catch(() => {
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
				return conn.query('SELECT * FROM block WHERE blocker=? AND blocked=?', [blocker, blocked])
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
