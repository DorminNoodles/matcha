

exports.createLike = (data) => {
		return new Promise((resolve, reject) => {
			mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'qwerty',
				database: 'matcha'
			}).then((conn) => {
				conn.query('INSERT INTO likes (\
					``)')
			})
		})
}
