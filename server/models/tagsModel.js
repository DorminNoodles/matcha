const database = require('../controllers/database');

exports.user = (userId) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				conn.query('SELECT tags.tag , tags.id FROM tags INNER JOIN usertags ON tags.id=usertags.tag_id WHERE usertags.user_id=' + userId)
					.then((res) => {
						resolve({ "status": "success", data: res });
					})
					.catch((err) => {
						reject({ status: "error", msg: "Bad query" });
					})
			})
			.catch((err) => { reject(err); })
	});
}

exports.get = (tag) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				conn.query('SELECT id, tag as value from tags WHERE LOWER(tag) LIKE "' + tag + '%";')
					.then((res) => {
						resolve(res)
					})
					.catch((err) => { reject({ status: "error" }); })
			})
			.catch((err) => { reject(err); })
	});
}