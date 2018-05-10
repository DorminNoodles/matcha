const db = require("../models/database");
const errJson = require("../models/errorJson");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const key = "e12eI21U1g8rilghi7ghd1D4Y5r9lk3g1d4"

const saltRounds = 10;

class User{

	constructor(){
		console.log('new user instance !')
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
				db.query("INSERT INTO users (username, password, email, firstname, lastname, address) VALUES (?, ?, ?, ?, ?, ?)", [ data.username, data.password, data.email, data.firstname, data.lastname, data.address, ], (err, res, fields) => {
					if (err)
						reject();
					else
						resolve();
				})
			}).catch(function(error){
				console.log("error=>>>  " + error);
				reject(error)
			})
		})
	}

	findUser(username){
		return new Promise((resolve, reject) => {
			db.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username], (err, res, fields) => {
				if (err || !res[0])
					reject()
				else
					resolve(res[0])
			})
		})
	}

	createJWTToken(userData){
		return new Promise((resolve, reject) => {
			var data = {
				id: userData.id,
				username: userData.username
			}

			jwt.sign(data, key, { expiresIn: '1h' }, (err, token) => {
				if (err)
					reject()
				else
					resolve({
						id: userData.id,
						username: userData.username,
						token: token

					})
			})
		})
	}

	comparePassword(pwd, pwdHash){
		return new Promise((resolve, reject) => {
			bcrypt.compare(pwd, pwdHash, function(err, res) {
				if (err)
					reject()
				else
					resolve()
			})
		})
	}

	connection(username, password){
		return new Promise((resolve, reject) => {
			var userData= {};
			this.findUser(username)
			.then((res) => {
				userData = res;
				return this.comparePassword(password, userData.password)
			})
			.then((res) => {
				return this.createJWTToken(userData)
			})
			.then((res) => {
				// console.log(res);
				resolve(res)
			})
			.catch((err)=>{
				console.log("error in connection")
				reject();
			})

			// db.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username], (err, res, fields) => {
			// 	if (err || !res[0])
			// 	{
			// 		reject()
			// 		return
			// 	}
			// 	bcrypt.compare(password, res[0].password, function(errBcrypt, resBcrypt) {
			// 		if (errBcrypt)
			// 		{
			// 			reject()
			// 			return;
			// 		}
            //
			// 		let data = {
			// 			id: res[0].id,
			// 			username: res[0].username
			// 		}
            //
			// 		// jwt.sign({data : 'fuck'}, 'secret', {algorithm: 'RS256', expiresIn : '1h'}, (errJWT, token)=>{
			// 		jwt.sign(data, key, { expiresIn: '1h' }, (errJWT, token) => {
			// 			if (errJWT)
			// 			{
			// 				reject()
			// 				return;
			// 			}
			// 			console.log(token)
			// 			resolve()
			// 			return (token);
			// 		});
			// 		// 	console.log(errJWT)
			// 		// });
			// 	});
			// })
		})
	}
}

module.exports = User
