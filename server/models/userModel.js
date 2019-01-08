const mysql = require('promise-mysql');

exports.findUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT email FROM users WHERE email=\''+ email +'\'');
			conn.end();
			return (result);
		}).then((result) => {
			resolve(result[0]);
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.saveUser = (data) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			conn.query("INSERT INTO users (username, password, firstname, lastname, email, gender, orientation)\
						VALUES ('" + data.username + "', '" + data.password + "', '" + data.firstname + "',\
						'" + data.lastname + "', '" + data.email + "', '" + data.gender + "', '" + data.orientation + "')")
			.then((res) => {
				console.log("success database");
				conn.end();
			}).catch((err) => {
				console.log(err);
				console.log("error database");
				conn.end();
				reject(err);
			})
		})
	})
}

exports.findUserByID = (id) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT * FROM users WHERE id=\''+ id +'\'');
			conn.end();
			return (result);
		}).then((result) => {
			resolve(result);
		}).catch((error) => {
			reject(error);
		})
	})
}

exports.findUserByUsername = (username) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		}).then((conn) => {
			var result = conn.query('SELECT * FROM users WHERE username=\''+ username +'\'');
			conn.end();
			return result;
		}).then((result) => {
			console.log(result[0].username);
			resolve(result[0]);
		}).catch((error) => {
			reject(error);
		})
	})
}