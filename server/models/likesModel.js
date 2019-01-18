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
