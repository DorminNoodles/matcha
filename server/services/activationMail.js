const emitter = require('../emitter');

class ActivationMail {

	constructor() {
		console.log("BORDEL++++++++++++++++++++++++++++++++++++");
		emitter.on('userRegistered', this.sendActivationMail);
	}

	sendActivationMail() {
		console.log('sendActivationMail');
	}
}

module.exports = ActivationMail;
