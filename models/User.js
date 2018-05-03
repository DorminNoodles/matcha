const db = require("../models/database");
const errJson = require("../models/errorJson");

class User{

	constructor(){
		console.log('new user created !')
	}

	// pouet(){
	// 	return new Promise(pute){
	// 		resolve();
	// 		reject();
	// 	}
	// }

	checkUsername(data){
		return new Promise(function(resolve, reject){
			if (data.username){
				if(db.state === 'disconnected')
					reject("Database connection failed !");
				db.query('SELECT * FROM `users` WHERE `username` = ?', data.username, (err, res, fields) => {
					console.log(res);
				}, function(err){
					reject(err);
					console.log("Query Failed");
				});
				resolve("username checked !");
			}
			else
				reject("error Username");
		})
	}

	checkPassword(data){
		return new Promise((resolve, reject) => {
			if (!data.password)
				reject("error Password")
			else {
				resolve("password checked !");
			}
		})
	}

	checkFirstname(data){
		return new Promise((resolve, reject) => {
			if (!data.firstname)
				reject("error Password");
			else {
				resolve("password checked !");
			}
		})
	}

	checkLastname(data){
		return new Promise((resolve, reject) => {
			if (!data.lastname)
				reject(errJson("error", "lastname error"));
			else {
				resolve("lastname checked !");
			}
		})
	}

	checkEmail(data){
		return new Promise((resolve, reject) => {
			if (!data.email)
			reject("error Email");
			else {
				resolve("email checked !");
			}
		})
	}

	checkAddress(data){
		return new Promise((resolve, reject) => {
			if (!data.address)
				reject("error Address");
			else {
				resolve("address checked !");
			}
		})
	}

	checkData(data){
		console.log(data)
		return new Promise((resolve, reject) => {
			this.checkUsername(data)
			.then((res) => {
				console.log("Username       OK");
				return this.checkPassword(data)
			})
			.then((res) => {
				console.log('Password       OK');
				return this.checkFirstname(data)
			})
			.then((res) => {
				console.log('Firstname      OK');
				return this.checkLastname(data)
			})
			.then((res) => {
				console.log('Lastname       OK');
				return this.checkAddress(data)
			})
			.then((res) => {
				console.log('Email          OK');
				return this.checkEmail(data)
			})
			.then((res) => {
				console.log("<----all check OK---->");
				resolve("Youhou");
			})
			.catch(function(error){
				console.log("error function");
				console.log("hellooooo");
				reject(error);
			})
		})
	}

	saveNewUser(data){
		return new Promise((resolve, reject) => {
			this.checkData(data).then(function(res){
				if (db.state === 'disconnected')
					reject(errJson("error", "hello", "choux"));
				db.query("INSERT INTO `users` ( `username`, `password`, `firstname`, `lastname`, `address`, `email`) VALUES ?", data, (err, res, fields) => {
					console.log(err);
					resolve({pouet : "hello"});
				})
			}).catch(function(error){
				console.log("error=>>>  " + error);
				reject(error)
			})
		})
	}
}

module.exports = User
