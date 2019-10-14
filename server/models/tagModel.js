const database = require('../controllers/database');

/*
	comment recuperer tous les users qui ont subscribe a un tag ?
		on peut stocker tous les subscribes dans un json dans la base de donné

	Comment savoir si un user a subscribe a un tag ?
		on peut stocker dans l'user tous ses tags

*/

exports.new = (tag, user_id) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				let rsl = conn.query('INSERT INTO tags (tag) VALUES (?)', [tag])
				conn.end();
				return rsl;
			}).then((res) => {
				exports.user(user_id, res.insertId)
					.then(() => {
						resolve({ "status": "success", "msg": "Tag saved !" });
					})
					.catch((err) => { reject(err) })
			})
			.catch((err) => { reject({ "status": "error", "msg": "Bad query !" }); })
	});
}

exports.get = (tag) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return new Promise((resolve, reject) => {
					conn.query('SELECT * FROM tags WHERE tag="' + tag + '"')
						.then((res) => {
							conn.end();

							if (res.length === 0)
								reject({ status: 'error', msg: 'Tag not found' });
							else
								resolve(res[0])
						})
						.catch(() => { reject({ status: 'error', msg: 'Tag not found' }); })
				})
			})
			.then((res) => { resolve(res) })
			.catch((err) => { reject(err) })
	});
}

// link the id_tag to user_id
exports.user = (user_id, tag_id) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				conn.query('SELECT * FROM usertags WHERE user_id=? AND tag_id=?;', [user_id, tag_id])
					.then((res) => {
						if (res.length === 0)
							conn.query('INSERT INTO usertags (user_id, tag_id) VALUES (?, ?)', [user_id, tag_id])
								.then((res) => {
									conn.end();
									resolve({ "status": "success", "msg": "Tags saved !" });
								}).catch((err) => {
									conn.end();
									reject(err);
								})
						else {
							conn.end();
							reject({ "status": "error", "key": "query", "msg": "Already saved" });
						}
					})
			}).catch((err) => { reject(err); })
	});
}

exports.delete = ({ user_id, tag_id }) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return new Promise((resolve, reject) => {
					conn.query('DELETE FROM usertags WHERE user_id=? AND tag_id=?;', [user_id, tag_id])
						.then((res) => {
							conn.end();
							resolve({ "status": "success", "msg": "Tags deleted" })
						}).catch((err) => { reject(err); })
				})
			}).then((res) => { resolve(res) })
			.catch((err) => { reject(err); })
	});
}