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

exports.getRecentsMessages = (data) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
		.then((conn) => {
			console.log(data)
			return conn.query('SELECT * FROM `chat` WHERE \
				(`from_id`=' + data.from + ' AND `to_id`=' + data.to + ') \
				OR \
				(`from_id`=' + data.to + ' AND `to_id`=' + data.from +')');
			return result;
		})
		.then((rows) => {
			resolve(rows);
		})
		.catch((err) => {
			reject(err);
		})
	})
}
