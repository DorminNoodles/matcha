const emitter = require('../emitter');

// const EventEmitter = require('events').EventEmitter;

// const userRegistreEvent = new EventEmitter;

class ActivationMail {

	constructor() {
		console.log("BORDEL++++++++++++++++++++++++++++++++++++");
		emitter.on('userRegistered');
	}

	sendActivationMail() {
		console.log('sendActivationMail');
	}
}

module.exports = ActivationMail;
