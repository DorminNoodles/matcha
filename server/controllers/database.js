const mysql = require('promise-mysql');

exports.connection = () => {
	return new Promise((resolve, reject) => {
		console.log('database');
		console.log(process.env.PORT);
		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
		.then((conn) => {
			console.log('connection');
			resolve(conn);
		})
		.catch((err) =>{
			reject({"status": "error", "key": "database", "msg": "Database connection error", "code": 503});
		})
	})
}
