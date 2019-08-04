const database = require('../controllers/database');

/*
	comment recuperer tous les users qui ont subscribe a un tag ?
		on peut stocker tous les subscribes dans un json dans la base de donné

	Comment savoir si un user a subscribe a un tag ?
		on peut stocker dans l'user tous ses tags

*/

exports.new = (tag, userId) => {
	return new Promise((resolve, reject) => {
		database.connection()
		.then((conn) => {
			conn.query('INSERT INTO tags (`userId`, `tag`) VALUES (?, ?)', [userId, tag])
			.then((res) => {
				console.log("Tag sucessfully created");
				resolve({"status": "success", "key": "tagSaved", "msg": "Tag saved !"});
			})
			.catch((err) => {
				console.log("/!\\ Tag save error /!\\");
				reject({"status": "error", "key": "query", "msg": "Bad query !"});
			})
		})
		.catch((err) => {
			reject(err);
		})
	});
}

exports.get = (tag, userId) => {
	return new Promise((resolve, reject) => {
		database.connection()
		.then((conn) => {
			console.log('HERE');
			conn.query('SELECT * FROM `tags` WHERE `tag` = ? AND `userId` = ?', [tag, userId])
			.then((res) => {
				console.log("OK >>>>>>>>>>>>>> ", res);
				if (res[0])
					resolve(res[0]);
				else
					reject({status: 'error', msg: 'Tag not found'});
			})
			.catch((err) => {
				console.log("FUCK >>>>>>>>>>>>>> ", err);
				// reject({"status": "error", "key": "query", "msg": "Bad query !"});
				reject();
			})
		})
		.catch((err) => {
			console.log(err);
			reject(err);
		})
	});
}

exports.delete = (tag, userId) => {
	return new Promise((resolve, reject) => {
		database.connection()
		.then((conn) => {
			return conn.query('DELETE FROM `tags` WHERE `tag` = ? AND `userId` = ?', [tag, userId])
		})
		.then((res) => {
			if(!res.affectedRows) {
				reject({status: 'error', msg: 'Tag not found'});
				return;
			}
			resolve({"status": "success", "key": "tagSaved", "msg": "Tag saved !"});
		})
		.catch((err) => {
			reject({status: 'error', msg: 'Tag not found'});
		})
	})
}
