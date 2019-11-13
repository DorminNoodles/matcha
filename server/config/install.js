const mysql = require('promise-mysql');
require('dotenv').config();
const { FakeProfile } = require('./fake.js');

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
			'INSERT INTO users (username,firstname, lastname, email, gender, orientation, bio, mailValidation, age, distance, ageMin, ageMax,location,  latitude, longitude, avatar, active, identity, mask)\
			VALUES ("David",  "David", "TRAN", "tran.lili0.lili0@gmail.com", "male", "heterosexual", "Jai une seconde vie", 1, 22, 200, 18, 25, "Paris", 48.864716, 2.349014, "http://localhost:3300/1/kneth_pls.jpg", 1, 17, 32),\
			("Lyana", "Lyana", "TRAN", "tran.lili1.lili@gmail.com", "female", "heterosexual", "je sais que je suis la", 1, 23, 200, 18, 25, "Saint-Denis", 48.56818, 2.62007, "http://localhost:3300/2/kneth_pls.jpg", 1, 34, 16),\
			("Eric", "Eric", "TRAN", "tran.lili2.lili@gmail.com", "male", "homosexual", "Je suis juste Eric", 1, 20, 200, 18, 25, "Clichy", 48.904526, 2.304768, "http://localhost:3300/3/kneth_pls.jpg", 1, 10, 8),\
			("Alix",  "Alix", "TRAN", "tran.lili3.lili@gmail.com", "female", "homosexual", "la tapenade cest bon", 1, 20, 200, 18, 25, "Pontault-Combault", 48.801255,2.6075980000000527, "http://localhost:3300/4/kneth_pls.jpg", 1, 5, 4),\
			("Kneth",  "Kneth", "TRAN", "tran.lili4.lili@gmail.com", "male", "bisexual", "Si jetais dans Dragon Ball Z, Je serais Krillin: inutile", 1, 20, 200, 18, 25, "Marne-la-Vallee", 48.859276, 2.598504999999932, "http://localhost:3300/5/kneth_pls.jpg", 1, 27, 2),\
			("Paloma",  "Paloma", "TRAN", "tran.lili5.lili@gmail.com", "female", "bisexual", "Je suis du Perou", 1, 19, 200, 18, 25, "Poissy", 48.929584, 2.046982000000071, "http://localhost:3300/6/kneth_pls.jpg", 1, 39, 1 ),\
			("Maxime", "Maxime", "TRAN", "tran.lili6.lili@gmail.com", "male", "bisexual", "peace and love", 1, 40, 200, 18, 25, "Andresy", 48.979048, 2.0510329999999612, "http://localhost:3300/7/kneth_pls.jpg", 1, 27,2),\
			("Lisa",  "Lisa", "TRAN", "tran.lili7.lili@gmail.com", "female", "heterosexual", "LOve PastEque", 1, 18, 200, 18, 25, "Charenton",  48.8193107, 2.4162804999999707, "http://localhost:3300/8/kneth_pls.jpg", 1,34, 16),\
			("Pierre", "Pierre", "TRAN", "tran.lili8.lili@gmail.com", "male", "heterosexual", "J aime les meme", 1, 20, 200, 18, 25, "Paris", 48.8469373, 2.344468000000006, "http://localhost:3300/9/kneth_pls.jpg", 1,17, 32 ),\
			("Marie",  "Marie", "TRAN", "tran.lili9.lili@gmail.com", "female", "homosexual", "Je suis allergique", 1, 30, 200, 18, 25, "Paris", 48.8462217, 2.3371604999999818, "http://localhost:3300/10/kneth_pls.jpg", 1,5, 4),\
			("Justine",  "Justine", "TRAN", "tran.lili10.lili@gmail.com", "female", "bisexual", "Mes cuisses se dechirent", 1, 26, 200, 18, 25, "Paris", 48.8331048, 2.3268889999999374, "http://localhost:3300/11/kneth_pls.jpg", 1, 39, 1);'
		);

		for (var i = 0; i < 80; i++) {
			var rsl = (i % 2 === 1) ? FakeProfile("male") : FakeProfile("female")
			await connection.query(
				`INSERT INTO users (username, firstname, lastname, email, gender, orientation, bio, mailValidation, age, distance, ageMin, ageMax,location,  latitude, longitude, avatar, active, identity, mask)\
				VALUES ("${rsl[0].username}", "${rsl[0].firstname}", "${rsl[0].lastname}", "${rsl[0].email}", "${rsl[0].gender}",  "${rsl[0].orientation}", "${rsl[0].bio}", 1, ${rsl[0].age}, ${rsl[0].distance}, ${rsl[0].ageMin}, ${rsl[0].ageMax},  "${rsl[0].location}", ${rsl[0].latitude},  ${rsl[0].longitude}, "${rsl[0].avatar}", NOW(), ${rsl[0].identity}, ${rsl[0].mask}),\
						("${rsl[1].username}", "${rsl[1].firstname}", "${rsl[1].lastname}", "${rsl[1].email}", "${rsl[1].gender}", "${rsl[1].orientation}", "${rsl[1].bio}", 1, ${rsl[1].age}, ${rsl[1].distance}, ${rsl[1].ageMin}, ${rsl[1].ageMax},  "${rsl[1].location}", ${rsl[1].latitude},  ${rsl[1].longitude}, "${rsl[1].avatar}", NOW(), ${rsl[1].identity}, ${rsl[1].mask}),\
						("${rsl[2].username}", "${rsl[2].firstname}", "${rsl[2].lastname}", "${rsl[2].email}", "${rsl[2].gender}", "${rsl[2].orientation}", "${rsl[2].bio}", 1, ${rsl[2].age}, ${rsl[2].distance}, ${rsl[2].ageMin}, ${rsl[2].ageMax},  "${rsl[2].location}", ${rsl[2].latitude},  ${rsl[2].longitude}, "${rsl[2].avatar}", NOW(), ${rsl[2].identity}, ${rsl[2].mask}),\
 						("${rsl[3].username}", "${rsl[3].firstname}", "${rsl[3].lastname}", "${rsl[3].email}", "${rsl[3].gender}", "${rsl[3].orientation}", "${rsl[3].bio}", 1, ${rsl[3].age}, ${rsl[3].distance}, ${rsl[3].ageMin}, ${rsl[3].ageMax},  "${rsl[3].location}", ${rsl[3].latitude},  ${rsl[3].longitude}, "${rsl[3].avatar}", NOW(), ${rsl[3].identity}, ${rsl[3].mask}),\
						("${rsl[4].username}", "${rsl[4].firstname}", "${rsl[4].lastname}", "${rsl[4].email}", "${rsl[4].gender}", "${rsl[4].orientation}", "${rsl[4].bio}", 1, ${rsl[4].age}, ${rsl[4].distance}, ${rsl[4].ageMin}, ${rsl[4].ageMax},  "${rsl[4].location}", ${rsl[4].latitude},  ${rsl[4].longitude}, "${rsl[4].avatar}", NOW(), ${rsl[4].identity}, ${rsl[4].mask}),\
						("${rsl[5].username}", "${rsl[5].firstname}", "${rsl[5].lastname}", "${rsl[5].email}", "${rsl[5].gender}", "${rsl[5].orientation}", "${rsl[5].bio}", 1, ${rsl[5].age}, ${rsl[5].distance}, ${rsl[5].ageMin}, ${rsl[5].ageMax},  "${rsl[5].location}", ${rsl[5].latitude},  ${rsl[5].longitude}, "${rsl[5].avatar}", NOW(), ${rsl[5].identity}, ${rsl[5].mask}),\
						("${rsl[6].username}", "${rsl[6].firstname}", "${rsl[6].lastname}", "${rsl[6].email}", "${rsl[6].gender}", "${rsl[6].orientation}", "${rsl[6].bio}", 1, ${rsl[6].age}, ${rsl[6].distance}, ${rsl[6].ageMin}, ${rsl[6].ageMax},  "${rsl[6].location}", ${rsl[6].latitude},  ${rsl[6].longitude}, "${rsl[6].avatar}", NOW(), ${rsl[6].identity}, ${rsl[6].mask}),\
						("${rsl[7].username}", "${rsl[7].firstname}", "${rsl[7].lastname}", "${rsl[7].email}", "${rsl[7].gender}", "${rsl[7].orientation}", "${rsl[7].bio}", 1, ${rsl[7].age}, ${rsl[7].distance}, ${rsl[7].ageMin}, ${rsl[7].ageMax},  "${rsl[7].location}", ${rsl[7].latitude},  ${rsl[7].longitude}, "${rsl[7].avatar}", NOW(), ${rsl[7].identity}, ${rsl[7].mask}),\
						("${rsl[8].username}", "${rsl[8].firstname}", "${rsl[8].lastname}", "${rsl[8].email}", "${rsl[8].gender}", "${rsl[8].orientation}", "${rsl[8].bio}", 1, ${rsl[8].age}, ${rsl[8].distance}, ${rsl[8].ageMin}, ${rsl[8].ageMax},  "${rsl[8].location}", ${rsl[8].latitude},  ${rsl[8].longitude}, "${rsl[8].avatar}", NOW(), ${rsl[8].identity}, ${rsl[8].mask}),\
						("${rsl[9].username}", "${rsl[9].firstname}", "${rsl[9].lastname}", "${rsl[9].email}", "${rsl[9].gender}", "${rsl[9].orientation}", "${rsl[9].bio}", 1, ${rsl[9].age}, ${rsl[9].distance}, ${rsl[9].ageMin}, ${rsl[9].ageMax},  "${rsl[9].location}", ${rsl[9].latitude},  ${rsl[9].longitude}, "${rsl[9].avatar}", NOW(), ${rsl[9].identity}, ${rsl[9].mask});`
			);
		}

		await connection.end();
	} catch (error) { console.error(error); }
}

db();
