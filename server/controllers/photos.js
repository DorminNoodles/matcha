const Photos = require('../services/photos');
const photosModel = require('../models/photosModel');
const fs = require('fs');

exports.move = (id, photo, name, prev) => {
	return new Promise((resolve, reject) => {
		let avatar = process.env.REACT_APP_PUBLIC + id + "/" + name
		try {
			Photos.move(id, photo, name)
			if (prev)
				photosModel.new(avatar, id)
					.then(() => { resolve({ "status": "success", "msg": "Photo added", "photo": avatar }); })
					.catch(() => { reject({ "status": "error", "msg": "bad query" }); })
			else
				resolve({ "status": "success", "msg": "Photo added", "photo": avatar });

		} catch (err) {
			reject({ "status": "error", "msg": "upload failed" });
		}
	})
}

exports.new = (id, photo, prev) => {
	return new Promise((resolve, reject) => {
		let date = new Date().getTime()
		let name = date + photo.name
		name = name.toLowerCase()

		if (prev)
			photosModel.deleteFile(id, prev)

		this.move(id, photo, name, prev)
			.then((res) => {
				resolve(res)
			})
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
