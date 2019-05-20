const mysql = require('promise-mysql');

exports.new = (blocker, blocked) => {
	return new Promise((resolve, reject) => {
		console.log("hello");
		mysql.createConnection({
			port: 3306,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
		.then((conn) => {
			console.log("hello");
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

exports.get = (blocker, blocked) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			port: 3306,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
		.then((conn) => {
			return conn.query('SELECT * FROM block WHERE blocker=? AND blocked=?', [blocker, blocked]);
		})
		.then((res) => {
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
