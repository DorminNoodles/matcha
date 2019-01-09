const mysql = require('promise-mysql');

async function db() {
	try {
		let connection = await mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'qwerty'
		})
		await connection.query('DROP DATABASE IF EXISTS matcha');
		await connection.query('CREATE DATABASE matcha');
		await connection.end();
		connection = await mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'qwerty',
			database : 'matcha'
		})
		console.log("> CONNECTED.");
		await connection.query('DROP TABLE IF EXISTS users');
		await connection.query('CREATE TABLE users (\
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
			username VARCHAR(30) NOT NULL,	\
			password VARCHAR(30) NOT NULL,	\
			firstname VARCHAR(30) NOT NULL,	\
			lastname VARCHAR(30) NOT NULL,	\
			email VARCHAR(255) NOT NULL,\
			gender VARCHAR(30) NOT NULL,\
			orientation VARCHAR(30) NOT NULL,\
			mailValidation VARCHAR(80),\
			reg_date TIMESTAMP\
		)');
		await connection.end();
	} catch (error) {
		console.error(error);
	}
}

db();