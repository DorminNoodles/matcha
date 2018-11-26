const ActivationMail = require('../services/activationMail');
const emitter = require('../emitter');

module.exports = () => {
	console.log("helloOne");
	emitter.on('userRegistered', ActivationMail.sendActivationMail);
}




/*
- subscribe to event




*/
