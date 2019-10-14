const database = require('../controllers/database');

exports.new = (liker, liked) => {
	return new Promise((resolve, reject) => {
		let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
		let like = { to_id: liked, from_id: liker, type: 3, date }
		let match = { to_id: liked, from_id: liker, type: 2, date }

		database.connection()
			.then((conn) => {
				return conn.query('INSERT INTO likes (liker, liked) VALUES (?, ?) ', [liker, liked]) // insert like
					.then(() => {
						return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?)', [liked, liker, 3, date]) // insert like notifs
							.then((res) => {
								const id_notifs = res.insertId
								return conn.query('UPDATE userschat \
									INNER JOIN  likes ON (likes.liker=? and likes.liked=?) \
									INNER JOIN likes as liki ON (liki.liked=? and liki.liker=?)\
									SET active=1 \
									WHERE first_user=LEAST(?, ?) \
									AND second_user=GREATEST(?,?)', [liker, liked, liker, liked, liker, liked, liker, liked])
									.then((res) => {
										conn.end()
										if (res.changedRows === 0)
											return this.createLikesNotifs(liker, liked, like, match, id_notifs, date)
												.then((response) => response)
												.catch((err) => reject(err))
										else {
											return this.updateLikesNotifs(liker, liked, like, match, id_notifs, date)
												.then((response) => response)
												.catch((err) => reject(err))
										}
									})
									.catch((err) => {
										return conn.query('SELECT * from likes \
														WHERE (liker=? AND liked=?) \
														OR (liked=? AND liker=?) \
														HAVING COUNT(*)=2)', [liker, liked, liker, liked])
											.then((res) => {
												return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?)', [liked, liker, 2, date])
													.then((res) => {
														conn.end()
														resolve({ res, like: { ...like, id: id_notifs } })
													})
											})
									});
							})
					})
			})
			.then((res) => { resolve({ "status": "success", "msg": "like added !", ...res }) })
			.catch(() => {
				reject({ "status": "error", "msg": "request failed" })
			})
	})
}

exports.createLikesNotifs = (liker, liked, like, match, id_notifs, date) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return conn.query('INSERT INTO userschat (first_user, second_user, active)\
								(SELECT liker, liked, TRUE as active FROM likes \
								WHERE(liker=LEAST(?, ?)  AND liked =GREATEST(?,?)) \
								OR (liked =GREATEST(?,?) AND liker =LEAST(?, ?) ) )'
					, [liker, liked, liker, liked, liker, liked, liker, liked])
					.then((res) => {
						if (res.changedRows > 0) {
							return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?), (?, ?, ?, ?)', [liked, liker, 2, date, liker, liked, 3, date])
								.then((res) => {
									conn.end();
									return ({ like: { ...like, id: id_notifs }, match: { ...match, id: res.insertId } })
								})
						}
						else if (res.affectedRows > 0) {
							return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?), (?, ?, ?, ?)', [liked, liker, 2, date, liker, liked, 3, date])
								.then((res) => {
									conn.end();
									return ({ like: { ...like, id: id_notifs }, match: { ...match, id: res.insertId } })
								})
						}
						else {
							conn.end();
							return ({ like: { ...like, id: id_notifs } })
						}
					});
			})
			.then((response) => { resolve(response) })
			.catch((err) => {
				if (err.code === "ER_DUP_ENTRY")
					resolve({ like: { ...like, id: id_notifs } })
				else
					reject({ "status": "error", "msg": "request failed" })
			})
	})
}

exports.updateLikesNotifs = (liker, liked, like, match, id_notifs, date) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return conn.query('SELECT * from likes \
							WHERE (liker=? AND liked=?) \
							OR (liked=? AND liker=?) \
							HAVING COUNT(*)=2 ', [liker, liked, liker, liked])
					.then((res) => {
						return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?), (?, ?, ?, ?)', [liked, liker, 2, date, liker, liked, 3, date])
							.then((res) => {
								conn.end();
								resolve({ like: { ...like, id: id_notifs }, match: { ...match, id: res.insertId } })
							})
					})
			})
			.catch((err) => {
				reject({ "status": "error", "msg": "request failed" })
			})
	})
}

exports.delete = (liker, liked) => {
	return new Promise((resolve, reject) => {
		let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

		database.connection()
			.then((conn) => {
				return conn.query('DELETE FROM likes WHERE liker=? AND liked=?;', [liker, liked])
					.then(() => {
						return conn.query('UPDATE userschat SET active=0 \
						 WHERE first_user=LEAST(?,?) \
						 AND second_user = GREATEST(?,?);', [liker, liked, liker, liked])
							.then(() => {
								let rlt = conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?)', [liked, liker, 4, date])
								conn.end();
								return rlt
							}).then((res) => ({ unlike: { to_id: liked, from_id: liker, type: 4, date, id: res.insertId } }))
					})
					.then((res) => { resolve({ "status": "success", ...res }) })
					.catch((err) => reject({ "status": "error", "msg": "request failed" }))
			})
	})
}

exports.getLike = (liker, liked) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return conn.query('SELECT * FROM likes WHERE liker=? AND liked=?', [liker, liked])
					.then((res) => {
						conn.end();
						res[0] ? resolve(res[0]) : reject('Like not found.')
					})
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			})
	})
}

exports.getLikes = (liked) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return conn.query('SELECT COUNT (*) FROM likes WHERE liked=?', [liked])
					.then((res) => {
						conn.end();
						res[0] ? resolve(res[0]) : reject('Likes not found.');
					})
			})
			.catch((err) => {
				console.log(err);
				reject();
			})
	})
}

