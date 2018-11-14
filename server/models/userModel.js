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


exports.findUserByName = (name) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			// console.log("name => " + name);
			// return result = conn.query('SELECT * FROM users');
			return conn.query('SELECT * FROM users WHERE username=\''+ name +'\'');
			// console.log(result);
		}).then((result) => {
			console.log(result);
		})
	})
}
