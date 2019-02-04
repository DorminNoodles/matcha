"use strict";
const checkInput = require('../services/checkInput');
const userModel = require('../models/userModel');
const myEmitter = require('../emitter');

class User {
	constructor(){
		// setTimeout(function () {
		// 	console.log('1');
		// }, 2000);
	}
	checkData(data) {
		return new Promise((resolve, reject) => {
			checkInput.username(data.username)
			.then((res) => {
				return checkInput.usernameAlreadyTaken(data.username);
			})
			.then((res) => {
				console.log('Username Checked');
				return checkInput.password(data.password);
			})
			.then(function (res) {
				console.log('Password Checked');
				return checkInput.firstname(data.firstname);
			})
			.then((res) => {
				console.log('Firstname Checked');
				return checkInput.lastname(data.lastname);
			})
			.then((res) => {
				console.log('Lastname Checked');
				return checkInput.location(data.location);
			})
			.then((res) => {
				console.log('Location Checked');
				return checkInput.email(data.email);
			})
			.then((res) => {
				return checkInput.emailAlreadyTaken(data.username);
			})
			.then((res) => {
				console.log('Email Checked');
				resolve(data);
			})
			.catch((err) => {
				console.log("ERROR REGISTERED: ", err);
				reject(err);
			})
		})
	}

	createUser(data) {
		return new Promise((resolve, reject) => {
			if (!data) {
				reject({"status": "error", "msg": "No Data !"});
				return;
			}
			this.checkData(data)
			.then((res) => {
				resolve(userModel.saveUser(data)
					.then(() => {
						myEmitter.emit('userRegistered', data);
					})
				);
			})
			.catch((err) => {
				console.log("checkData error: ", err);
				reject(err);
			})
		})
	}

	authenticate(username, password) {
		return new Promise((resolve, reject) => {

			userModel.findUserByName(username)
			.then((data) => {
				console.log(data);
				console.log(data.username);
				let token = jwt.sign({
					id: data.id,
					username: data.username,
					email: data.email
				}, 'shhhhhhhhh');
				resolve(token);
				return;
			})
			.catch(() => {
				reject();
			})
		})
	}

	checkAuth(token) {

	}
}

module.exports = User;
