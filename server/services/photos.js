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
					console.log(res.id);
					mkdirp('public/pictures/user' + res.id, (err) => {
						if (err)
							reject({ 'status': 'error', 'msg': 'Photo UserFolder not created !' });
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

	static move(id, data, nb) {
		data.mv('public/pictures/' + id + '/avatar_' + id + "_" + nb + "_" + data.name, (err) => {
			if (err)
				return ({ status: "error", key: "avatar", msg: "Avatar upload error !" });
			else
				return ({ status: "success" });
		})
	}

	static countPhotos = (id, callback) => {
		fs.readdir('./public/pictures/' + id, (err, files) => {
			if (err)
				callback(0);
			callback(files.length);
		});
	}

	static removeTMP(data) {
		fs.unlink('uploads/' + data.name);
	}
}

module.exports = Photos;
