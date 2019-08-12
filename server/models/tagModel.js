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
				conn.query('INSERT INTO tags (`tag`) VALUES (?)', [tag])
					.then((res) => {
						console.log("Tag sucessfully created");
						console.log(res)
						console.log(res.insertId)
						conn.query('INSERT INTO usertags (`user_id, tag_id`) VALUES (?,?)', [user_id, tag])

						resolve({ "status": "success", "key": "tagSaved", "msg": "Tag saved !" });
					})
					.catch((err) => {
						console.log("/!\\ Tag save error /!\\");
						reject({ "status": "error", "key": "query", "msg": "Bad query !" });
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
				conn.query('SELECT * FROM tags WHERE tag = "' + tag + '"')
					.then((res) => {
						if (res[0])
							resolve(res[0]);
						else
							reject({ status: 'error', msg: 'Tag not found' });
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

exports.user = (user_id, tag_id) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				conn.query('INSERT INTO usertags (user_id, tag_id) VALUES (?, ?)', [user_id, tag_id])
					.then((res) => {
						resolve({ "status": "success", "key": "tag", "msg": "Tag saved !" });
					})
					.catch((err) => {
						console.log("/!\\ Tag save error /!\\");
						reject({ "status": "error", "key": "query", "msg": "Bad query !" });
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
