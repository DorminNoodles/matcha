"use strict";
const checkInput = require('../services/checkInput');
const userModel = require('../models/userModel');
const events = require('events');


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
			.then((data) => {
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
				//send Email Verif
				resolve();
			})
			.catch(() => {
				reject();
			})

			console.log("saveUser");
			resolve();
		})
	}

}

module.exports = User;
