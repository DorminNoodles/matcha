const mysql = require('promise-mysql');
const userModel = require('./userModel');

exports.getOrientation = (id) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		}).then((conn) => {
			return conn.query("SELECT orientation FROM users WHERE id =?", [id]);
		}).then((res) => {
			resolve(res[0].orientation);
		}).catch((err) => {
			reject(err);
		})
	})
}

exports.getPeopleByRange = (data) => {
	return new Promise((resolve, reject) => {
		console.log("peopleByRange");
		userModel.findUserByID(data.id)
		.then((res) => {
			console.log(res);
			console.log("end");
			data.lat = res[0].latitude;
			data.long = res[0].longitude;
			console.log(data.lat);
			return mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'qwerty',
					database:'matcha'
				})
		}).then((conn) => {
			return conn.query("SELECT id, username, firstname, age, location FROM users WHERE longitude BETWEEN ? AND ?", [1.0, 3.0]);
		}).then((res) => {
			resolve();
			console.log(res);
		})
	}).catch((error) => {
		reject(error);
	})	
}

exports.getPeopleByScore = (data, orientation) => {
	return new Promise((resolve, reject) => {
		return mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'qwerty',
					database:'matcha'
		}).then((conn) => {
			if(orientation == "male" || orientation == "female")
				return conn.query("SELECT id, username, firstname, age, location FROM users WHERE (id!=? AND gender=? AND score=?) ORDER BY score DESC", [data.id, orientation, score]);
			else
				return conn.query("SELECT id, username, firstname, age, location FROM users WHERE (id!=? AND score=?) ORDER BY score DESC", [data.id, orientation, score]);
		}).then((res) => {
			resolve(res);
		})
	}).catch((error) => {
		reject(error);
	})	
}

exports.getPeopleByAge = (data, orientation) => {
	return new Promise((resolve, reject) => {
		return mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'qwerty',
					database:'matcha'
		}).then((conn) => {
			if(orientation == "male" || orientation == "female")
				return conn.query("SELECT id, username, firstname, age, location FROM users WHERE (id<>? AND gender=? AND age BETWEEN ? AND ?) ORDER BY age ASC", [data.id, orientation, data.limitAgeMin, data.limitAgeMax]);
			else
				return conn.query("SELECT id, username, firstname, age, location FROM users WHERE (id<>? AND age BETWEEN ? AND ?) ORDER BY age ASC", [data.id, data.limitAgeMin, data.limitAgeMax]);
		}).then((res) => {
			console.log(res);
			resolve(res);
		})
	}).catch((error) => {
		reject(error);
	})	
}

exports.getPeopleByTag = (data, orientation) => {
	return new Promise((resolve, reject) => {
		return mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		}).then((conn) => {
			console.log(data.tags);
			if (this.countTags(data.tags) > 1) {
				console.log("Many elements");
				allTags = data.tags.join(' OR t.tag=');
				console.log(allTags);
			} else {
				console.log("One element");
				allTags = data.tags;
			}
			if (orientation == "male" || orientation == "female") {
				let sql = 'SELECT us.id, us.username, us.firstname, us.age, us.location FROM users us INNER JOIN tags t ON us.id = t.user_id WHERE (us.id<>\''+ data.id +'\' AND gender=\''+ orientation +'\' AND t.tag=' + allTags + ')';
				return conn.query(sql);
				// return conn.query("SELECT id, username, firstname, age, location FROM users INNER JOIN users.id = tags.user_id WHERE (id<>\''+ data.id +'\' AND gender=\''+ orientation +'\' AND tags.tag=?))", [allTags.replace(/'/g, "")]);
			}
			else {
				// return conn.query("SELECT us.id, us.username, us.firstname, us.age, us.location FROM users us INNER JOIN tags t ON us.id = t.user_id WHERE (us.id<>? AND t.tag=?)", [data.id, allTags]);
				let sql = 'SELECT us.id, us.username, us.firstname, us.age, us.location FROM users us INNER JOIN tags t ON us.id = t.user_id WHERE (us.id<>\''+ data.id +'\' AND t.tag=\''+ allTags +'\')';
				return conn.query(sql);
			}
		}).then((res) => {
			console.log("------>");
			console.log(res);
			console.log("<------");
			resolve(res);
		})
	}).catch((error) => {
		console.log(error);
		reject(error);
	})
}

exports.countTags = (tags) => {
		return tags.length;
}

// exports.getAge = (data) => {
// 	return new Promise((resolve, reject) => {
// 		console.log(data);
// 		return mysql.createConnection({
// 			host:'localhost',
// 			user:'root',
// 			password:'qwerty',
// 			database:'matcha'
// 		}).then((conn) => {
// 			return conn.query('SELECT YEAR(CURRENT_TIMESTAMP) - YEAR(age)\
// 				- (RIGHT(CURRENT_TIMESTAMP, 5) < RIGHT(age, 5)) as age FROM users WHERE id=?;', [data.id]);
// 		}).then((row) => {
// 			console.log(row[0].age);
// 			return row;
// 		})
// 	}).catch((error) => {
// 		reject(error);
// 	})
// }