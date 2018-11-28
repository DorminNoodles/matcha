const emitter = require('../emitter');

class ActivationMail {

	constructor() {
		emitter.on('userRegistered', this.sendActivationMail);
		console.log("BORDEL++++++++++++++++++++++++++++++++++++");
	}

	displayMessage() {
		console.log("DISPLAY MESSAGE");
	}

	sendActivationMail() {
		console.log('sendActivationMail');
	}
}
module.exports = new ActivationMail();
