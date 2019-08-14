const mysql = require('promise-mysql');
require('dotenv').config();

async function db() {
	try {
		let connection = await mysql.createConnection({

			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty'
		})
		await connection.query('DROP DATABASE IF EXISTS matcha');
		await connection.query('CREATE DATABASE matcha');
		await connection.end();
		connection = await mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
		console.log("> CONNECTED.");
		await connection.query('DROP TABLE IF EXISTS users');
		await connection.query('DROP TABLE IF EXISTS tags');
		await connection.query('DROP TABLE IF EXISTS userTags');
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
			tmp_email VARCHAR(255),\
			gender VARCHAR(255) NOT NULL,\
			orientation VARCHAR(255) DEFAULT \'bisexual\',\
			location VARCHAR(255),\
			avatar VARCHAR(255) NOT NULL, \
			mailValidation INT DEFAULT 0,\
			score INT DEFAULT 0, \
			age INT, \
			distance INT DEFAULT 100, \
			ageMin INT DEFAULT 18, \
			ageMax INT DEFAULT 120, \
			latitude DOUBLE DEFAULT 0, \
			longitude DOUBLE DEFAULT 0, \
			bio TEXT, \
			active DATETIME, \
			reg_date TIMESTAMP, \
			compatibility INT DEFAULT 63 \
		)');
		await connection.query('CREATE TABLE tags (\
        	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, \
        	tag VARCHAR(255) NOT NULL \
		)');
		await connection.query('CREATE TABLE userTags (\
        	user_id INT NOT NULL, \
        	tag_id INT NOT NULL\
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

		await connection.query(
			'INSERT INTO users (username,password ,firstname,lastname ,email,gender,orientation ,bio,mailValidation,score ,age ,distance ,ageMin ,ageMax ,latitude ,longitude ,avatar ,active ,reg_date ,compatibility)\
			VALUES ("Lisouiw", "", "Lisa", "TRAN", "tran.lili.lili@gmail.com", "female", "heterosexual", "lo", 1, 63, 22, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2),\
			("Lisouiw1", "", "Lisa1", "TRAN", "tran.lili1.lili@gmail.com", "female", "heterosexual", "je sais que je suis la", 1, 63, 23, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2),\
			("Lisouiw2", "", "Lisa2", "TRAN", "tran.lili2.lili@gmail.com", "male", "heterosexual", "lo", 1, 63, 20, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2),\
			("Lisouiw3", "", "Lisa3", "TRAN", "tran.lili3.lili@gmail.com", "female", "heterosexual", "test", 1, 63, 20, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2),\
			("Lisouiw4", "", "Lisa4", "TRAN", "tran.lili4.lili@gmail.com", "male", "heterosexual", "lo", 1, 63, 20, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2),\
			("Lisouiw5", "", "Lisa5", "TRAN", "tran.lili5.lili@gmail.com", "female", "heterosexual", "manger de la pasteque", 1, 63, 19, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2),\
			("Lisouiw6", "", "Lisa6", "TRAN", "tran.lili6.lili@gmail.com", "male", "bisexual", "peace and love", 1, 63, 40, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2),\
			("Lisouiw7", "", "Lisa7", "TRAN", "tran.lili7.lili@gmail.com", "female", "heterosexual", "rire", 1, 63, 18, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2),\
			("Lisouiw8", "", "Lisa8", "TRAN", "tran.lili8.lili@gmail.com", "female", "heterosexual", "trop le fun", 1, 63, 20, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2),\
			("Lisouiw9", "", "Lisa9", "TRAN", "tran.lili9.lili@gmail.com", "female", "homosexual", "viens ici", 1, 63, 30, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2),\
			("Lisouiw10", "", "Lisa10", "TRAN", "tran.lili10.lili@gmail.com", "female", "heterosexual", "nul", 1, 63, 26, 200, 18,25, 1, 23, "je suis lisa", 1, 1,2);'
			);
		await connection.end();
	} catch (error) {
		console.error(error);
	}
}

db();
