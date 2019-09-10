const database = require('../controllers/database');

exports.new = (liker, liked) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return conn.query('INSERT INTO likes (liker, liked) VALUES (?, ?)', [liker, liked]).then(() => {
					return conn.query('REPLACE userschat (first_user, second_user, active)\
						(SELECT liker, liked, TRUE as active FROM likes \
						WHERE(liker =? AND liked =?) OR(liked =? AND liker =?)\
						 HAVING COUNT(*) = 2 ORDER BY liker ASC)', [liker, liked, liker, liked]);
				})
			})
			.then((res) => {
				console.log(res.affectedRows) // SEND Notif Match
				console.log('like add !');
				resolve({ "status": "success", "msg": "like added !" });
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			})
	})
}

exports.delete = (liker, liked) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return conn.query('DELETE FROM likes WHERE liker=? AND liked=?;', [liker, liked]).then(() => {
					return conn.query('UPDATE userschat SET active=0  WHERE first_user=LEAST(?,?) AND second_user=GREATEST(?,?);', [liker, liked, liker, liked])
			})})
			.then((res) => {
				resolve({ "status": "success" });
			})
			.catch((err) => {
				reject({ "status": "error", "msg": "request failed" });
			})
	})
}

exports.getLike = (liker, liked) => {
	return new Promise((resolve, reject) => {
		database.connection()
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
				reject(err);
			})
	})
}

exports.getLikes = (liked) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			port: process.env.PORT,
			host: 'localhost',
			user: 'root',
			password: 'qwerty',
			database: 'matcha'
		})
			.then((conn) => {
				return conn.query('SELECT COUNT (*) FROM likes WHERE liked=?', [liked]);
			})
			.then((res) => {
				if (res[0])
					resolve(res[0]);
				else
					reject('Likes not found.');
			})
			.catch((err) => {
				console.log(err);
				reject();
			})
	})
}

