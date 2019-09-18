const express = require('express');
const Photos = require('../services/photos');

exports.new = (id, photo, position) => {
	return new Promise((resolve, reject) => {

		Photos.countPhotos(id, function (nb) {
			if (nb < 5) {
				var name = 'avatar_' + id + "_" + nb + "_" + photo.name
				Photos.move(id, photo, position)
				resolve({ "status": "success", "msg": "Photo added", "photo": name });
			}
			else
				reject({ "status": "error", "msg": "photo limit reached" });
		})
	});
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
