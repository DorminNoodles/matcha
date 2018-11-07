const mysql = require('promise-mysql');

// mysql.createConnection({
//   host :		'localhost',
//   user :		'root',
//   password :	'qwerty'
// }).then((connection) => {
// 	return connection.query('DROP DATABASE IF EXISTS matcha');
// }).then(() => {
//
// }).catch((err) => {
// 	console.log(err);
// })




// const connection = async () => {
// 	return
// }

async function run() {
	try {
		let connection = await mysql.createConnection({
			host :		'localhost',
			user :		'root',
			password :	'qwerty'
		})
		await connection.query('DROP DATABASE IF EXISTS matcha');
		await connection.query('CREATE DATABASE matcha');
		await connection.end();
	} catch (error) {
		console.error(error);
	}
}

run();


// connection.query('DROP DATABASE IF EXISTS matcha');
// connection.query('CREATE DATABASE matcha');
// connection.end();
//

// connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'qwerty',
//   database : 'matcha'
// });

// connection.connect(function(err){
// 	if (err)
// 		return;
// });
// connection.query('DROP TABLE IF EXISTS users');
// connection.query('CREATE TABLE users (\
// 					id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
// 					username VARCHAR(30) NOT NULL, \
// 					password VARCHAR(30) NOT NULL, \
// 					firstname VARCHAR(30) NOT NULL,\
// 					lastname VARCHAR(30) NOT NULL,\
// 					email VARCHAR(255),\
// 					bio BLOB,\
// 					mailValidation VARCHAR(80),\
// 					tags TEXT,\
// 					score INT(6),\
// 					reg_date TIMESTAMP\
// 				)');
// connection.end();




// username
// password
// email
// firstname
// lastname
// mailValidation
// gender
// lookingFor
// bio
// tags
// populiScore
