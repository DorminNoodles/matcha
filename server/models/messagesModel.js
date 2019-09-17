// const database = require('../controllers/database');

// exports.new = (data) => {
// 	return new Promise((resolve, reject) => {
// 		console.log("NEW MESSAGES");
// 		database.connection()
// 			.then((conn) => {
// 				conn.query('INSERT INTO chat (\
// 				`from_id`,\
// 				`to_id`,\
// 				`message`\
// 			)VALUES (\
// 				\'' + data.from + '\',\
// 				\'' + data.to + '\',\
// 				\'' + data.body + '\'\
// 			)').then((res) => {
// 					console.log("success database");
// 					conn.end();
// 					resolve();
// 				}).catch((err) => {
// 					console.log(err);
// 					console.log("error database");
// 					conn.end();
// 					reject(err);
// 				})
// 			});
// 		resolve();
// 	})
// }

// exports.getRecentsMessages = (data) => {
// 	return new Promise((resolve, reject) => {
// 		database.connection()
// 			.then((conn) => {
// 				console.log(data)
// 				return conn.query('SELECT * FROM `chat` WHERE \
// 				(`from_id`=' + data.from + ' AND `to_id`=' + data.to + ') \
// 				OR \
// 				(`from_id`=' + data.to + ' AND `to_id`=' + data.from + ')');
// 				return result;
// 			})
// 			.then((rows) => {
// 				resolve(rows);
// 			})
// 			.catch((err) => {
// 				reject(err);
// 			})
// 	})
// }

// exports.listMessages = (data) => {
// 	return new Promise((resolve, reject) => {
// 		database.connection()
// 			.then((conn) => {
// 				console.log(data)
// 				return conn.query('SELECT * FROM `chat` WHERE \
// 				(`from_id`=' + data.from + ' AND `to_id`=' + data.to + ') \
// 				OR \
// 				(`from_id`=' + data.to + ' AND `to_id`=' + data.from + ')');
// 				return result;
// 			})
// 			.then((rows) => {
// 				resolve(rows);
// 			})
// 			.catch((err) => {
// 				reject(err);
// 			})
// 	})
// }
