const emitter = require('../emitter');

class ActivationMail {

	constructor() {
		emitter.on('userRegistered', this.sendActivationMail);
	}

	sendActivationMail() {
		console.log('sendActivationMail');
	}
}
module.exports = new ActivationMail();
