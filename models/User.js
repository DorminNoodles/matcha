const db = require("../models/database");
const errJson = require("../models/errorJson");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User{

	constructor(){
		console.log('new user created !')
	}

	checkUsername(data){
		return new Promise(function(resolve, reject){
			if (data.username){
				if(db.state === 'disconnected')
					reject("Database connection failed !")
				db.query('SELECT * FROM `users` WHERE `username` = ?', data.username, (err, res, fields) => {
					console.log(res);
				}, function(err){
					reject(err);
					console.log("Query Failed")
				});
				resolve("username checked !")
			}
			else
				reject("error Username")
		})
	}

	checkPassword(data){
		return new Promise((resolve, reject) => {
			if (!data.password)
				reject("error Password")
			else {
				bcrypt.hash(data.password, saltRounds).then(function(hash) {
					data.password = hash;
					resolve("password checked !");
				});
			}
		})
	}

	checkName(data){
		return new Promise((resolve, reject) => {
			if (!data.firstname && !data.lastname)
				reject("error Name");
			else {
				resolve("password checked !");
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
				return this.checkName(data)
			})
			.then((res) => {
				console.log('Name      OK');
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
				// console.log("hellooooo " + data.username);
				db.query("INSERT INTO users (username, password, email, firstname, lastname, address) VALUES (?, ?, ?, ?, ?, ?)", [ data.username, data.password, data.email, data.firstname, data.lastname, data.address, ], (err, res, fields) => {
					// console.log(err);
					if (err)
						reject();
					else
						resolve();
					// resolve({pouet : "hello"});
				})
			}).catch(function(error){
				console.log("error=>>>  " + error);
				reject(error)
			})
		})
	}

	connection(username, password){
		return new Promise((resolve, reject) => {




		})
	}
}

module.exports = User
