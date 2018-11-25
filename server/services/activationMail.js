const EventEmitter = require('events').EventEmitter;

const userRegistreEvent = new EventEmitter;

class ActivationMail {

	constructor() {
		userRegisterEvent.on('userJoined', this.displayMessage);
	}

	displayMessage (){
		console.log('testo here');
	}
}
