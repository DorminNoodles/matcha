const mysql = require('promise-mysql');

exports.new = (liker, liked) => {
		return new Promise((resolve, reject) => {
			mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'qwerty',
				database: 'matcha'
			})
			.then((conn) => {
				return conn.query('INSERT INTO likes (`liker`, `liked`) \
					VALUES ( ?, ?)', [liker, liked]);
			})
			.then((res) => {
				console.log('like add !');
				resolve({"status": "success", "msg": "like added !"});
			})
			.catch((err) => {
				console.log(err);
				reject();
			})
		})
}

exports.delete = (liker, liked) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
		.then((conn) => {
			return conn.query('DELETE FROM likes WHERE liker=? AND liked=?', [liker, liked]);
		})
		.then((res) => {
			resolve({"status": "success"});
		})
		.catch((err) => {
			reject({"status": "error", "msg" : "request failed"});
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
			return conn.query('SELECT * FROM likes WHERE liker=? AND liked=?', [liker, liked]);
		})
		.then((res) => {
			if (res[0])
				resolve(res[0]);
			else
				reject('Like not found.');
		})
		.catch((err) => {
			console.log(err);
			reject();
		})
	})
}

exports.getLikesSended = (liker) => {
		return new Promise((resolve, reject) => {
			mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'qwerty',
				database: 'matcha'
			})
			.then((conn) => {
				return conn.query('SELECT * FROM likes WHERE liker=?', [liker]);
			})
			.then((res) => {
				if (res[0])
					resolve(res);
				else
					reject('Likes not found.');
			})
			.catch((err) => {
				console.log(err);
				reject();
			})
		})
}

exports.getLikesGived = (liked) => {
		return new Promise((resolve, reject) => {
			mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'qwerty',
				database: 'matcha'
			})
			.then((conn) => {
				return conn.query('SELECT * FROM likes WHERE liked=?', [liked]);
			})
			.then((res) => {
				if (res[0])
					resolve(res);
				else
					reject('Like not found.');
			})
			.catch((err) => {
				console.log(err);
				reject();
			})
		})
}
