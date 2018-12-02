"use strict";
// const ActivationMail = require('../services/activationMail');
const checkInput = require('../services/checkInput');
const userModel = require('../models/userModel');
const emitter = require('../emitter');

class User {

	constructor(){
		console.log('Hellomoto');
		emitter.on('userRegistered', this.displayMessage);
	}

	displayMessage (){
		// console.log('testy');
	}

	userJoined (username) {

	}

	checkData(data) {
		return new Promise((resolve, reject) => {
			checkInput.username(data.username)
			.then((res) => {
				console.log('Username Checked');
				return checkInput.password(data.password);
			})
			.then((res) => {
				console.log('Password Checked');
				return checkInput.firstname(data.firstname);
			})
			.then((res) => {
				console.log('Firstname Checked');
				return checkInput.email(data.email);
			})
			.then((res) => {
				console.log('Email Checked');
				return checkInput.geoloc(data.location);
			})
			.then((res) => {
				console.log('Location Checked');
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			})
		})
	}

	createUser(data) {
		return new Promise((resolve, reject) => {
			if (!data)
				reject();
			this.checkData(data)
			.then((res) => {
				console.log(res);
				console.log("checkData Valid");
				resolve(data);
			})
			.catch((err) => {
				console.log(err);
				console.log("checkData error");
				reject(err);
			})
		})
	}

	saveUser(data) {
		return new Promise((resolve, reject) => {
			userModel.saveUser(data)
			.then(() => {
				console.log('hello+++++++++++++++');
				emitter.emit('userRegistered');
				console.log('hello+++++++++++++++');
				resolve();
			})
			.catch(() => {
				reject();
			})

			console.log("saveUser");
			resolve();
		})
	}

	authenticate(username, password) {
		return new Promise((resolve, reject) => {

			checkInput.username(username)
			.then(() => {
				return checkInput.password(password);
			})
			.then(() => {
				resolve();
			})
			.catch(() => {
				reject();
			})


			user.findUserByName(username)
			.then((data) => {
				console.log(data);
				let token = jwt.sign({
					id: data.id,
					username: data.username,
					email: data.email
				}, 'shhhhhhh');
				resolve(token);
			})
			.catch(() => {
				reject();
			})
		})
	}

}

module.exports = User;
