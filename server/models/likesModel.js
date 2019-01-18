const mysql = require('promise-mysql');

exports.new = (data) => {
		return new Promise((resolve, reject) => {
			mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'qwerty',
				database: 'matcha'
			})
			.then((conn) => {
				return conn.query('INSERT INTO likes (`liker`, `liked`) \
					VALUES (\''+ data.liker +'\', \''+ data.liked + '\')');
			})
			.then((res) => {
				console.log('like add !');
				resolve();
			})
			.catch((err) => {
				console.log(err);
				reject();
			})
		})
}

exports.getLike = (liker, liked) => {
		return new Promise((resolve, reject) => {
			mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'qwerty',
				database: 'matcha'
			})
			.then((conn) => {
				return conn.query('SELECT * FROM likes WHERE liker='+ liker);
			})
			.then((res) => {
				console.log(res);
				console.log('like FIND');
				resolve(res);
			})
			.catch((err) => {
				console.log(err);
				reject();
			})
		})
}
