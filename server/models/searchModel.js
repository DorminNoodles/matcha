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
			console.log(">>>> ", res.latitude);
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