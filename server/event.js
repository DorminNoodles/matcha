const EventEmitter = require('events').EventEmitter;
const chatRoomEvents = new EventEmitter;
const registerEvent = new EventEmitter;

// const displayMessage = () => {
// 	console.log("message");
// }
//
// const userJoined = () => {
// 	chatRoomEvents.on('message', displayMessage);
// 	console.log('UserJoined');
// }
//
// chatRoomEvents.on('userJoined', userJoined);
//
// // chatRoomEvents.emit('userJoined', "chut");
// chatRoomEvents.emit('message', 'Pokemon');
// chatRoomEvents.emit('userJoined', 'Pokemon');
// chatRoomEvents.emit('message', 'Psokemon');
// chatRoomEvents.removeListener('message', displayMessage);
// chatRoomEvents.emit('message', 'Psokemon');


class sendActivate {

	constructor() {
		registerEvent.on('newRegister', this.send);
	}

	send() {
		console.log("Send activation mail");
	}

}

class register {
	create() {
		registerEvent.emit('newRegister');
	}
}



const activation =  new sendActivate();
const userRegister =  new register();

userRegister.create();
