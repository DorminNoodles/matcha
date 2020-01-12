const database = require('../controllers/database');

exports.new = (liker, liked) => {
	return new Promise((resolve, reject) => {

		database.connection()
			.then((conn) => {

				// insert like
				return conn.query('INSERT INTO likes (liker, liked) VALUES (?, ?) ', [liker, liked])
					.then((res) => {

						//create userchat
						return conn.query('INSERT IGNORE INTO userschat (first_user, second_user, active) \
						VALUES (?,?,0)', [Math.min(liker, liked), Math.max(liker, liked)])
							.then(() => {
								conn.end()
								return this.match(liker, liked)
									.then((res) => { return this.notif(liker, liked, res) })
							}).catch((err) => { reject(err) })
					}).then((res) => { resolve(res) })
			})
	})
}


exports.notif = (liker, liked, type) => {
	return new Promise((resolve, reject) => {
		let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
		let like = { to_id: liked, from_id: liker, type: 3, date }
		let match = { to_id: liked, from_id: liker, type: 2, date }
		let match_two = { to_id: liker, from_id: liked, type: 2, date }

		database.connection()
			.then((conn) => {
				return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?)', [liked, liker, 3, date])
					.then((res) => {
						const id_notifs = res.insertId
						if (type === "match") {
							return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?)', [liked, liker, 2, date])
								.then((res) => {
									console.log("HOALLAL")
									console.log(res)
									const id_one = res.insertId
									return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?)', [liker, liked, 2, date])
										.then((res) => {
											conn.end()
											return ({ like: { ...like, id: id_notifs }, match: [{ ...match, id: id_one }, { ...match_two, id: res.insertId }] })
										})
								})
						}
						else { return ({ like: { ...like, id: id_notifs } }) }
					}) // insert like notifs
			})
			.then((res) => { resolve(res) })
			.catch((err) => { reject(err); })
	})
}



exports.match = (liker, liked) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				return conn.query('UPDATE userschat\
									SET active=1\
								  	WHERE (SELECT count(*) FROM likes WHERE (liker=? && liked=?) OR (liker=? && liked=?)) = 2 \
								  	AND(first_user = ? AND second_user =?)', [liker, liked, liked, liker, Math.min(liker, liked), Math.max(liker, liked)])
					.then((res) => {

						console.log(res)
						console.log("===================")
						conn.end();
						if (res.affectedRows > 0)
							resolve("match")
						else
							resolve("no")
					})
			})
			.catch((err) => { reject(err); })
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

