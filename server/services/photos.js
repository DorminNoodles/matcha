const emitter = require('../emitter');
const mkdirp = require('mkdirp');
const userModel = require('../models/userModel');

class Photos {

	constructor() {
		emitter.on('userRegistered', this.createUserFolder);
	}

	createUserFolder(data) {
		return new Promise((resolve, reject) => {

			// mkdirp("/pouet/pouet/pouet");
			userModel.findUserByUsername(data.username)
			.then((res) => {
				console.log(res.id);
				mkdirp('pictures/user1', (err) => {
					console.log("error mkdirp");
					reject();
				});
				resolve();
				console.log("Hello >>> ", res);
			})
			.catch(() => {
				console.log("error");
			})

		})
		// mkdirp('/pictures/user' , function (err) {
		//     if (err) console.error(err)
		//     else console.log('pow!')
		// });
	}

}


module.exports = new Photos();
