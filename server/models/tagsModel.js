const database = require('../controllers/database');

exports.new = (tag, userId) => {
	return new Promise((resolve, reject) => {
		database.connection()
		.then((conn) => {
			conn.query('INSERT INTO tags (`id`, `tag`) VALUES (?, ?)', [userId, tag])
			.then((res) => {
				console.log("OK >>>>>>>>>>>>>> ", res);
				resolve({"status": "success", "key": "tagSaved", "msg": "Tag saved !"});
			})
			.catch((err) => {
				console.log("FUCK >>>>>>>>>>>>>> ", err);
				reject({"status": "error", "key": "query", "msg": "Bad query !"});
			})
		})
		.catch((err) => {
			reject(err);
		})
	});
}

exports.get = (tag) => {
	return new Promise((resolve, reject) => {
		database.connection()
		.then((conn) => {
			conn.query('SELECT * FROM `tags` WHERE `tag` = ?', tag)
			.then((res) => {
				console.log("OK >>>>>>>>>>>>>> ", res);
				if (res[0])
					resolve(res[0]);
				else
					reject();
			})
			.catch((err) => {
				console.log("FUCK >>>>>>>>>>>>>> ", err);
				// reject({"status": "error", "key": "query", "msg": "Bad query !"});
				reject();
			})
		})
		.catch((err) => {
			reject(err);
		})
	});
}

exports.patch = (tag, data) => {
	return new Promise((resolve, reject) => {
		database.connection()
		.then((conn) => {
			let str = data.toString();
			console.log(str)
			// conn.query('UPDATE tags SET `users` ')
		})
		.cath((err) => {
			reject(err);
		})
	});
}
