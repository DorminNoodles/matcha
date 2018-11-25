"use strict";

const ActivationMail = require('../services/activationMail');
const checkInput = require('../services/checkInput');
const userModel = require('../models/userModel');
const EventEmitter = require('events').EventEmitter;

const userRegisterEvent = new EventEmitter;


class User {

	constructor(){
		userRegisterEvent.on('userJoined', this.displayMessage);
		// setTimeout(function () {
		// 	console.log('1');
		// }, 2000);
	}

	displayMessage (){
		console.log('testo');
	}

	userJoined (username) {
		// console.log("USERJOINED");
		// chatRoomEvents.on('message', this.displayMessage);
		// console.log("USERJOINED");
		// console.log('User Joined ! +++++++++++++'+ username +'++++++++++++++');
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
				let ho = new ActivationMail;
				// userRegisterEvent.emit('userJoined', 'GOOOOOOOOO');
				// chatRoomEvents.emit('userJoined', 'GOOOOOOOOO');
				// chatRoomEvents.removeListener('message', this.displayMessage);
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

}

module.exports = User;
