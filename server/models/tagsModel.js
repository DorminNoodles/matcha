const database = require('../controllers/database');

exports.userTags = (userId) => {
	return new Promise((resolve, reject) => {
		database.connection()
			.then((conn) => {
				conn.query('SELECT `id`, `tag` FROM `tags` WHERE `userId` = ?', [userId])
					.then((res) => {

					})
					.catch((err) => {
						reject({ status: "error", key: "tags" });
					})
			})
			.catch((err) => { reject(err); })
	});
}

// exports.get = (userId) => {
// 	return new Promise((resolve, reject) => {
// 		database.connection()
// 		.then((conn) => {
// 			conn.query('SELECT `id`, `tag` FROM `tags` WHERE `userId` = ?', [userId])
// 			.then((res) => {
// 				console.log("OK >>>>>>>>>>>>>> ", res);
// 				if (res[0])
// 					resolve(res);
// 				else
// 					reject({status: 'error', msg: 'Tags not found'});
// 			})
// 			.catch((err) => {
// 				reject({status: "error", key: "tags"});
// 			})
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			reject(err);
// 		})
// 	});
// }