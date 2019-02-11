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

exports.getMinAge = (minimum) => {
	return new Promise((resolve, reject) => {
		var today = query('SELECT \'GETDATE()\', CONVERT (date, GETDATE())');
		var min = query("DATEADD(YEAR, -?, today", [minimum]);
		return(min);
		resolve(min);
	}).catch((error) => {
		reject(error);
	})
}

exports.getMaxAge = (maximum) => {
	return new Promise((resolve, reject) => {
		var today = query('SELECT \'GETDATE()\', CONVERT (date, GETDATE())');
		var max = query("DATEADD(YEAR, ?, today", [maximum]);
		return(max);
		resolve(max);
	}).catch((error) => {
		reject(error);
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
		console.log("peopleByAge");
		var ageMax = data.limitAgeMax;
		var ageMin = data.limitAgeMin;
		return mysql.createConnection({
					host:'localhost',
					user:'root',
					password:'qwerty',
					database:'matcha'
		})
		.then((conn) => {
			return conn.query("SELECT * FROM users WHERE YEAR(age) BETWEEN ", []);
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

exports.getAge = (data) => {
	userModel.findUserByID(data.id)
	.then((res) => {
		return mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
		})
	}).then((conn) => {
		return conn.query('SELECT YEAR(CURRENT_TIMESTAMP) - YEAR(age)\
			- (RIGHT(CURRENT_TIMESTAMP, 5) < RIGHT(age, 5)) as age FROM users WHERE id=1;');
	}).then((row) => {
		console.log(row[0].age);
		return row;
	})
}

// exports.getAgeFromUser = (id) => {
// 	return new Promise((resolve, reject) => {
// 		mysql.createConnection({
// 			host:'localhost',
// 			user:'root',
// 			password:'qwerty',
// 			database:'matcha'
// 		})
// 		.then((conn) => {
// 			return conn.query('SELECT * FROM users WHERE ((MONTH(age) -1) * 31 + (DAY(age) -1)) % (31 * 12)\
//        							BETWEEN ((MONTH('2013-11-20') - 1) * 31 + (DAY('2013-11-20') - 1)) % (31 * 12)\
//            						AND ((MONTH('2013-12-10') - 1)* 31 + (DAY('2013-12-10') + 371)) % (31 * 12)');
// 		}).then((res) => {
// 			console.log("Age: " + res);
// 			resolve();
// 		}).catch((err) => {
// 			reject(err);
// 		})
// 	})
// }