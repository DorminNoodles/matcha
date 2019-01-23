const mysql = require('promise-mysql');

exports.new = (blocker, blocked) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
		.then((conn) => {
			return conn.query('INSERT INTO block (`blocker`, `blocked`) \
				VALUES ( ?, ?)', [blocker, blocked]);
		})
		.then((res) => {
			resolve({"status": "success", "msg": "block added !"});
		})
		.catch((err) => {
			reject({"status": "error", "msg": "error db"});
		})
	})
}
