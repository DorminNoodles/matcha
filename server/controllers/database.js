const mysql = require('promise-mysql');

exports.connection = () => {
	return new Promise((resolve, reject) => {
		console.log('database');
		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
		.then((conn) => {
			resolve(conn);
		})
		.catch((err) =>{
			reject({"status": "error", "key": "database", "msg": "Database connection error"});
		})
	})
}
