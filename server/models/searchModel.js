const mysql = require('promise-mysql');
const userModel = require('./userModel');

exports.getOrientation = (id) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		})
		.then((conn) => {
			return conn.query("SELECT orientation FROM users WHERE id =?", [id]);
		}).then((res) => {
			console.log("Orientation: " + res);
			resolve();
		}).catch((err) => {
			reject(err);
		})
	})
}

exports.getProfiles = (orientation, min, max) => {
	return new Promise((resolve, reject) => {
		mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		})
		.then((conn) => {
			return conn.query("SELECT * FROM users WHERE age BETWEEN ? AND ?", [min, max]);
			resolve();
		})
	}).catch((error) => {
		reject(error);
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
		})
		.then((conn) => {
			return conn.query("SELECT * FROM users WHERE longitude BETWEEN ? AND ?", [1.0, 3.0]);
			// resolve();
		})
		.then((res) => {
			console.log(res);
		})
	}).catch((error) => {
		console.log(error);
		reject(error);
	})	
}

exports.getPeopleByScore = (data) => {
	return new Promise((resolve, reject) => {
		console.log("peopleByScore");
		return mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'qwerty',
					database:'matcha'
		})
		.then((conn) => {
			return conn.query("SELECT * FROM users WHERE score=?", [score]);
			// resolve();
		})
		.then((res) => {
			console.log(res);
		})
	}).catch((error) => {
		console.log(error);
		reject(error);
	})	
}

exports.getPeopleByAge = (data) => {
	return new Promise((resolve, reject) => {
		return mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'qwerty',
					database:'matcha'
		})
		.then((conn) => {
			return conn.query("SELECT id, username, firstname, age, location FROM users WHERE age BETWEEN ? AND ? ORDER BY age ASC", [data.limitAgeMin, data.limitAgeMax]);
			resolve(); 
		})
		.then((res) => {
			console.log(res);
		})
	}).catch((error) => {
		console.log(error);
		reject(error);
	})	
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