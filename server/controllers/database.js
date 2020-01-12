const mysql = require('promise-mysql');
dotenv = require('dotenv').config();

exports.connection = () => {
	return new Promise((resolve, reject) => {
		console.log('>>## Database connection ##<<');
		console.log(process.env.PORT);
		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
		.then((conn) => {
			console.log("\033[32m");
			console.log(' Database connection');
			console.log("\033[0m");
			console.log('>>## Database end ##<<');
			resolve(conn);
		})
		.catch((err) =>{
			console.log(err)
			console.log("\033[31m");
			console.log("/!\\ DATABASE ERROR CONNECTION /!\\");
			console.log("\033[0m");
			console.log('>>## Database end ##<<');
			reject({"status": "error", "key": "database", "msg": "Database connection error", "code": 503});
		})
	})
}
