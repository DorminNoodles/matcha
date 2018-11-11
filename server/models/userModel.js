const mysql = require('promise-mysql');

exports.saveUser = (data) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			conn.query('INSERT INTO users (\
				username,\
				password,\
				firstname,\
				lastname,\
				email,\
				gender,\
				lookingfor\
			)VALUES (\
				\'hello\',\
				\'hello\',\
				\'hello\',\
				\'hello\',\
				\'hello\',\
				\'hello\',\
				\'hello\'\
			)')
			.then((res) => {
				console.log("success database");
				conn.end();
				resolve();

			}).catch((err) => {
				console.log(err);
				console.log("error database");
				conn.end();
				reject(err);
			})
			console.log("TEST");
		});
	})
}
