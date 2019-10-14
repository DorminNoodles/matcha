const Photos = require('../services/photos');
const photosModel = require('../models/photosModel');
const fs = require('fs');

exports.move = (id, photo, name) => {
	return new Promise((resolve, reject) => {
		photosModel.new(name, id)
			.then(() => {
				try {
					Photos.move(id, photo, name)
					resolve({ "status": "success", "msg": "Photo added", "photo": name });
				} catch (err) {
					reject({ "status": "error", "msg": "upload failed" });
				}
			}).catch(() => {
				reject({ "status": "error", "msg": "bad query" });
			})
	})
}

exports.new = (id, photo, prev) => {
	return new Promise((resolve, reject) => {
		let date = new Date().getTime()
		let name = date + photo.name
		name = name.toLowerCase()

		if (prev) {
			photosModel.deleteFile(id, prev).then(() => {
				this.move(id, photo, name)
					.then((res) => { resolve(res) })
					.catch((err) => { reject(err) })
			}).catch((err) => { reject(err); })
		}
		else
			this.move(id, photo, name)
				.then((res) => { resolve(res) })
				.catch((err) => { reject(err); })
	})
}

exports.get = (id) => {
	return new Promise((resolve, reject) => {
		const fs = require('fs');
		let result = []
		fs.readdir('./public/pictures/' + id, (err, files) => {
			if (files && files.length > 0)
				files.forEach((el) => {
					result.push(el);
				})
			resolve({ ...result });
		})
	})
}

exports.delete = (id, filename) => {
	return new Promise((resolve, reject) => {
		const fs = require('fs');
		fs.unlink('./public/pictures/' + id + '/' + filename, (err) => {
			if (err)
				reject({ "status": "error", "msg": "file not deleted check filename" });
			else
				resolve({ "status": "success", "msg": "file deleted" });
		})
	})
}
