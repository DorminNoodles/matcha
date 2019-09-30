const mysql = require('promise-mysql');
const userModel = require('../models/userModel');
const database = require('../controllers/database');

exports.new = (blocker, blocked) => {
	return new Promise((resolve, reject) => {

		userModel.findUserById(blocked, blocker).then((res) => {
			database.connection()
				.then((conn) => {
					var result = conn.query('INSERT INTO block (`blocker`, `blocked`) \
							VALUES ( ?, ?)', [blocker, blocked])
						.then(() => {
							var result = conn.query('UPDATE userschat SET active=0 \
											 WHERE first_user=LEAST(?, ?) \
											 AND second_user=GREATEST(?, ?)'
								, [blocker, blocked, blocker, blocked]);

						})
					conn.end();
					return result
				})
				.then(() => { resolve({ "status": "success", "msg": "block success" }); })
				.catch(() => { reject({ "status": "error", "msg": "error db" }); })
		}).catch(() => {
			reject({ "status": "error", "msg": "user not exist" });
		})
	})
}

exports.get = (blocker, blocked) => {
	return new Promise((resolve, reject) => {

		database.connection()
			.then((conn) => {
				var result = conn.query('SELECT * FROM block WHERE blocker=? AND blocked=?', [blocker, blocked])
				conn.end();
				return result
			})
			.then((res) => {
				if (res[0])
					resolve(res[0]);
				else
					reject('Block not found.');
			})
			.catch((err) => { reject(); })
	})
}
