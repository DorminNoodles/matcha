const mysql = require('promise-mysql');


exports.newMessage = (data) => {
	return new Promise((resolve, reject) => {
		resolve();
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			conn.query('INSERT INTO messages (\
				from,\
				to,\
				body\
			)VALUES (\
				\'hello\',\
				\'hello\',\
				\'hello\'\
			)').then((res) => {
				console.log("success database");
				conn.end();
				resolve();
			}).catch((err) => {
				console.log(err);
				console.log("error database");
				conn.end();
				reject(err);
			})
		});
	})
}
