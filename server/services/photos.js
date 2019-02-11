const emitter = require('../emitter');
const mkdirp = require('mkdirp');
const userModel = require('../models/userModel');
const fs = require('fs');

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
						resolve();
				});
			})
			.catch(() => {
				console.log("error");
				reject();
			})
		})
	}

	static move(id, filename) {
		var oldPath = 'uploads/' + filename;
		var newPath = 'pictures/user' + id + '/' + filename;

		fs.rename(oldPath, newPath, function (err) {
			if (err) throw err
				console.log('Successfully renamed - AKA moved!')
		})
	}

	static countPhotos(id, callback) {
		fs.readdir('./pictures/user' + id, (err, files) => {
			if (err)
				return (0);

			console.log(files.length);
			callback(files.length);
		});
	}

	static removeTMP(filename) {
		fs.unlink('uploads/' + filename);
	}

	static get(id) {
		fs.readdir('./pictures/user' + id, (err, files) => {
			files.forEach((el) => {
				console.log(el);
			})
		})
	}
}

module.exports = Photos;
