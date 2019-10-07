const database = require('../controllers/database');

exports.new = (data) => {
	return new Promise((resolve, reject) => {
		console.log("NEW VISIT");
		database.connection()
			.then((conn) => {
				conn.query('INSERT INTO visits (\
				`user_id`,\
				`his_id`\
			)VALUES (\
				\'' + data.user_id + '\',\
				\'' + data.his_id + '\'\
			)').then((res) => {
					console.log("success database");
					conn.end();
					resolve();
				}).catch((err) => {
					console.log(err);
					console.log("error database");
					conn.end();
					reject(err);
				})
			});
		resolve();
	})
}

exports.getVisits = (data) => {
	return new Promise((resolve, reject) => {
		console.log("hello");
		database.connection()
			.then((conn) => {
				console.log(data)
				console.log("hello");
				return conn.query('SELECT * FROM `visits` WHERE user_id= ? LIMIT 5', [data.user_id]);
			})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				// console.log("ERRRRRRRRR");
				reject(err);
			})
	})
}
