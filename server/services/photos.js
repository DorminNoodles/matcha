const emitter = require('../emitter');
const mkdirp = require('mkdirp');
const userModel = require('../models/userModel');

class Photos {

	constructor() {

	}

	createUserFolder(data) {
		return new Promise((resolve, reject) => {

			userModel.findUserByUsername(data.username)
			.then((res) => {
				console.log(res.id);
				mkdirp('pictures/user' + res.id, (err) => {
					if (err)
						reject({'status': 'error', 'msg': 'Photo UserFolder not created !'});
					else
						resolve()
				});
			})
			.catch(() => {
				console.log("error");
				reject();
			})

		})
		// mkdirp('/pictures/user' , function (err) {
		//     if (err) console.error(err)
		//     else console.log('pow!')
		// });
	}

	move(username, avatar) {
		userModel.findUserByUsername(username)
		.then((res) => {
			var fs = require('fs')

			var oldPath = 'uploads/' + avatar;
			var newPath = 'pictures/user' + res.id + '/avatar.jpg';

			fs.rename(oldPath, newPath, function (err) {
				if (err) throw err
					console.log('Successfully renamed - AKA moved!')
			})
		})
	}

}

module.exports = Photos;
