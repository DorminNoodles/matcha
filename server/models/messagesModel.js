const mysql = require('promise-mysql');


exports.new = (data) => {
	return new Promise((resolve, reject) => {
		console.log("NEW MESSAGES");
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			conn.query('INSERT INTO chat (\
				`from_id`,\
				`to_id`,\
				`message`\
			)VALUES (\
				\'' + data.from + '\',\
				\'' + data.to + '\',\
				\'' + data.body + '\'\
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
		resolve();
	})
}
