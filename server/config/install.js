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
			orientation VARCHAR(255) DEFAULT \'bisexual\',\
			location VARCHAR(255),\
			avatar VARCHAR(255) NOT NULL, \
			mailValidation INT DEFAULT 0,\
			identity  INT NOT NULL, \
			mask INT, \
			age INT, \
			distance INT DEFAULT 100, \
			ageMin INT DEFAULT 18, \
			ageMax INT DEFAULT 120, \
			latitude DOUBLE DEFAULT 0, \
			longitude DOUBLE DEFAULT 0, \
			bio TEXT, \
			active DATETIME, \
			tmp_email BIGINT \
		)');
		await connection.query('CREATE TABLE tags (\
        	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, \
        	tag VARCHAR(255) NOT NULL \
		)');
		await connection.query('CREATE TABLE userTags (\
        	user_id INT NOT NULL, \
			tag_id INT NOT NULL,\
			CONSTRAINT UC_tags UNIQUE (user_id, tag_id)\
        )');
		await connection.query('CREATE TABLE block (\
        	blocker INT NOT NULL,\
			blocked INT NOT NULL,\
			CONSTRAINT UC_block UNIQUE (blocker, blocked)\
        	)');
		await connection.query('CREATE TABLE likes (\
        	liker INT NOT NULL,\
			liked INT NOT NULL,\
			CONSTRAINT UC_like UNIQUE (liker, liked)\
        	)');
		await connection.query('CREATE TABLE report (\
        	reporting INT NOT NULL, \
			reported INT NOT NULL, \
			CONSTRAINT UC_report UNIQUE (reporting, reported)\
        )');
		await connection.query('CREATE TABLE notifs (\
        	id INT AUTO_INCREMENT PRIMARY KEY, \
        	type INT NOT NULL, \
        	from_id INT NOT NULL, \
        	to_id INT NOT NULL, \
        	date DATETIME DEFAULT CURRENT_TIMESTAMP \
        )');
		await connection.query('CREATE TABLE chat (\
        	group_id INT NOT NULL, \
			from_id INT NOT NULL, \
			to_id INT NOT NULL, \
        	message TEXT, \
        	date DATETIME DEFAULT CURRENT_TIMESTAMP \
		)');
		await connection.query('CREATE TABLE userschat (\
        	id INT AUTO_INCREMENT PRIMARY KEY, \
			first_user INT NOT NULL, \
			second_user INT NOT NULL, \
			date DATETIME DEFAULT CURRENT_TIMESTAMP, \
			active INT DEFAULT 1, \
			CONSTRAINT UC_userschat UNIQUE (first_user, second_user)\
		)');
		await connection.query('CREATE TABLE ban (id INT UNSIGNED NOT NULL)');
		await connection.query('INSERT INTO tags (tag) \
			VALUES ("foot"), ("fruits"), ("chien"), ("chat"), ("chiot"), ("chaton"), ("peche"), ("fraise"), ("hiver"), ("ete"), ("vacances");'
		);
		await connection.query('INSERT INTO usertags (user_id, tag_id) \
			VALUES (1,1), (1,4), (1,5), (1,8), (2,1), (2,2), (2,4), (2,5), (3,7), (3,8), (4,1), (4,2), (4,5), (4,10), (5,10), (6,5), (6,3), (6,8), (7,3),(7,4), (8,5), (9,4),(9,9), (10,7), (10,9), (11,4), (11,8);'
		);
		await connection.query('INSERT INTO likes (liker, liked) \
			VALUES (1,1), (1,4), (1,5), (1,8), (2,1), (2,2), (2,4), (2,5), (3,7), (3,8), (4,1), (4,2), (4,5), (4,10), (5,10), (6,5), (6,3), (6,8), (7,3),(7,4), (8,5), (9,4),(9,9), (10,7), (10,9), (11,4), (11,8);'
		);
		await connection.query(
			'INSERT INTO users (username, password, firstname, lastname, email, gender, orientation, bio, mailValidation, age, distance, ageMin, ageMax,location,  latitude, longitude, avatar, active, identity, mask)\
			VALUES ("David", "", "David", "TRAN", "tran.lili0.lili0@gmail.com", "male", "heterosexual", "Jai une seconde vie", 1, 22, 200, 18, 25, "Paris", 48.864716, 2.349014, "kneth_pls.jpg", 1, 17, 32),\
			("Lyana", "", "Lyana", "TRAN", "tran.lili1.lili@gmail.com", "female", "heterosexual", "je sais que je suis la", 1, 23, 200, 18, 25, "Saint-Denis", 48.56818, 2.62007, "kneth_pls.jpg", 1, 34, 16),\
			("Eric", "", "Eric", "TRAN", "tran.lili2.lili@gmail.com", "male", "homosexual", "Je suis juste Eric", 1, 20, 200, 18, 25, "Clichy", 48.904526, 2.304768, "kneth_pls.jpg", 1, 10, 8),\
			("Alix", "", "Alix", "TRAN", "tran.lili3.lili@gmail.com", "female", "homosexual", "la tapenade cest bon", 1, 20, 200, 18, 25, "Pontault-Combault", 48.801255,2.6075980000000527, "kneth_pls.jpg", 1, 5, 4),\
			("Kneth", "", "Kneth", "TRAN", "tran.lili4.lili@gmail.com", "male", "bisexual", "Si jetais dans Dragon Ball Z, Je serais Krillin: inutile", 1, 20, 200, 18, 25, "Marne-la-Vallee", 48.859276, 2.598504999999932, "kneth_pls.jpg", 1, 27, 2),\
			("Paloma", "", "Paloma", "TRAN", "tran.lili5.lili@gmail.com", "female", "bisexual", "Je suis du Perou", 1, 19, 200, 18, 25, "Poissy", 48.929584, 2.046982000000071, "kneth_pls.jpg", 1, 39, 1 ),\
			("Maxime", "", "Maxime", "TRAN", "tran.lili6.lili@gmail.com", "male", "bisexual", "peace and love", 1, 40, 200, 18, 25, "Andresy", 48.979048, 2.0510329999999612, "kneth_pls.jpg", 1, 27,2),\
			("Lisa", "", "Lisa", "TRAN", "tran.lili7.lili@gmail.com", "female", "heterosexual", "LOve PastEque", 1, 18, 200, 18, 25, "Charenton",  48.8193107, 2.4162804999999707, "kneth_pls.jpg", 1,34, 16),\
			("Pierre", "", "Pierre", "TRAN", "tran.lili8.lili@gmail.com", "male", "heterosexual", "J aime les meme", 1, 20, 200, 18, 25, "Paris", 48.8469373, 2.344468000000006, "kneth_pls.jpg", 1,17, 32 ),\
			("Marie", "", "Marie", "TRAN", "tran.lili9.lili@gmail.com", "female", "homosexual", "Je suis allergique", 1, 30, 200, 18, 25, "Paris", 48.8462217, 2.3371604999999818, "kneth_pls.jpg", 1,5, 4),\
			("Justine", "", "Justine", "TRAN", "tran.lili10.lili@gmail.com", "female", "bisexual", "Mes cuisses se dechirent", 1, 26, 200, 18, 25, "Paris", 48.8331048, 2.3268889999999374, "kneth_pls.jpg", 1, 39, 1);'
		);

		await connection.end();
	} catch (error) { console.error(error); }
}

db();