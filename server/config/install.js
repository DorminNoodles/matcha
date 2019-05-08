const mysql = require('promise-mysql');

async function db() {
	console.log("> TEST");

	try {
		let connection = await mysql.createConnection({
			port: 3307,
			host : 'localhost',
			user : 'root',
			password : 'qwerty'
		})
		await connection.query('DROP DATABASE IF EXISTS matcha');
		await connection.query('CREATE DATABASE matcha');
		await connection.end();
		connection = await mysql.createConnection({
			port: 3307,
			host : 'localhost',
			user : 'root',
			password : 'qwerty',
			database : 'matcha'
		})
		console.log("> CONNECTED.");
		await connection.query('DROP TABLE IF EXISTS users');
		await connection.query('DROP TABLE IF EXISTS tags');
		await connection.query('DROP TABLE IF EXISTS likes');
		await connection.query('DROP TABLE IF EXISTS block');
		await connection.query('DROP TABLE IF EXISTS report');
		await connection.query('DROP TABLE IF EXISTS visits');
		await connection.query('DROP TABLE IF EXISTS notifs');
		await connection.query('DROP TABLE IF EXISTS chat');
		await connection.query('CREATE TABLE users (\
			id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
			username VARCHAR(255) NOT NULL,	\
			password VARCHAR(255) NOT NULL,	\
			firstname VARCHAR(255) NOT NULL,	\
			lastname VARCHAR(255) NOT NULL,	\
			email VARCHAR(255) NOT NULL,\
			gender VARCHAR(255) NOT NULL,\
			orientation VARCHAR(255) NOT NULL,\
			location VARCHAR(255) NOT NULL,\
			mailValidation INT DEFAULT 0,\
			score INT DEFAULT 0, \
			latitude INT DEFAULT 0, \
			longitude INT DEFAULT 0, \
			bio TEXT, \
			age DATETIME, \
			active DATETIME, \
			reg_date TIMESTAMP \
		)');
		await connection.query('CREATE TABLE tags (\
        	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, \
        	user_id INT, \
        	tag VARCHAR(255) \
        )');
        await connection.query('CREATE TABLE block (\
        	id INT AUTO_INCREMENT PRIMARY KEY,\
        	blocker INT NOT NULL,\
        	blocked INT NOT NULL\
        	)');
        await connection.query('CREATE TABLE likes (\
        	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        	liker INT NOT NULL,\
        	liked INT NOT NULL\
        	)');
        await connection.query('CREATE TABLE report (\
        	id INT AUTO_INCREMENT PRIMARY KEY, \
        	user_id INT NOT NULL, \
        	his_id INT NOT NULL \
        )');
        await connection.query('CREATE TABLE visits (\
        	id INT AUTO_INCREMENT PRIMARY KEY, \
        	user_id INT NOT NULL, \
        	his_id INT NOT NULL, \
        	date DATETIME DEFAULT CURRENT_TIMESTAMP \
        )');
    	await connection.query('CREATE TABLE notifs (\
        	id INT AUTO_INCREMENT PRIMARY KEY, \
        	user_id INT NOT NULL, \
        	his_id INT NOT NULL, \
        	notif TEXT, \
        	seen INT NOT NULL DEFAULT 0, \
        	date DATETIME DEFAULT CURRENT_TIMESTAMP \
        )');
    	await connection.query('CREATE TABLE chat (\
        	id INT AUTO_INCREMENT PRIMARY KEY, \
			from_id INT NOT NULL, \
			to_id INT NOT NULL, \
        	message TEXT, \
        	date DATETIME DEFAULT CURRENT_TIMESTAMP \
        )');
		await connection.end();
	} catch (error) {
		console.error(error);
	}
}

db();
