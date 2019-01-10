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
			id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
			username VARCHAR(255) NOT NULL,	\
			password VARCHAR(255) NOT NULL,	\
			firstname VARCHAR(255) NOT NULL,	\
			lastname VARCHAR(255) NOT NULL,	\
			email VARCHAR(255) NOT NULL,\
			gender VARCHAR(255) NOT NULL,\
			orientation VARCHAR(255) NOT NULL,\
			mailValidation INT DEFAULT 0,\
			reg_date TIMESTAMP\
		)');
		await connection.end();
	} catch (error) {
		console.error(error);
	}
}

db();