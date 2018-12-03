const mysql = require('promise-mysql');
const emitter = require('../emitter');

// exports.saveUser = (data) => {
// 	return new Promise((resolve, reject) => {
// 		resolve();
// 		// mysql.createConnection({
// 		// 	host: 'localhost',
// 		// 	user: 'root',
// 		// 	password: 'qwerty',
// 		// 	database: 'matcha'
// 		// }).then((conn) => {
// 		// 	conn.query('INSERT INTO users (\
// 		// 		username,\
// 		// 		password,\
// 		// 		firstname,\
// 		// 		lastname,\
// 		// 		email,\
// 		// 		gender,\
// 		// 		orientation\
// 		// 	)VALUES (\
// 		// 		\'hello\',\
// 		// 		\'hello\',\
// 		// 		\'hello\',\
// 		// 		\'hello\',\
// 		// 		\'hello\',\
// 		// 		\'hello\',\
// 		// 		\'hello\'\
// 		// 	)').then((res) => {
// 		// 		console.log("success database");
// 		// 		conn.end();
// 		// 		resolve();
// 		// 	}).catch((err) => {
// 		// 		console.log(err);
// 		// 		console.log("error database");
// 		// 		conn.end();
// 		// 		reject(err);
// 		// 	})
// 		// });
// 	})
// }

exports.saveUser = (data) => {
	return new Promise((resolve, reject) => {

		console.log("saveUser in DB");

		resolve();
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
			return conn.query('SELECT * FROM users WHERE username=\''+ name +'\'');
		}).then((result) => {
			// console.log(result);
			resolve(result);
		}).catch((error) => {
			reject(error);
		})
	})
}
