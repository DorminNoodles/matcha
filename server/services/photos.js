const emitter = require('../emitter');
const mkdirp = require('mkdirp');
const userModel = require('../models/userModel');
const fs = require('fs');

class Photos {

	constructor() {

	}

	createUserFolder(data) {
		return new Promise((resolve, reject) => {

			userModel.findUserByUsername(data.username, 0)
				.then((res) => {
					mkdirp('public/pictures/' + res.id, (err) => {
						if (err)
							reject({ 'status': 'error', 'msg': 'Photo UserFolder not created !' });
						else
							resolve();
					});
				})
				.catch(() => {
					reject();
				})
		})
	}

	static move(id, data, name) {
		data.mv('public/pictures/' + id + '/' + name, (err) => {

			if (err)
				return ({ status: "error", key: "avatar", msg: "Avatar upload error !" });
			else
				return ({ status: "success" });
		})
	}

	static countPhotos(id, callback) {
		fs.readdir('./public/pictures/' + id, (err, files) => {
			if (err)
				callback(0);
			callback(files.length);
		});
	}
}

module.exports = Photos;
