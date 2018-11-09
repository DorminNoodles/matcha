const mysql = require('promise-mysql');

exports.saveUser = (data) => {
	return new Promise(() => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			conn.end();
		});
	})
}
