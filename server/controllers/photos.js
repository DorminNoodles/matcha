const express = require('express');
const Photos = require('../services/photos');

exports.new = (id, photo) => {
	return new Promise((resolve, reject) => {

		Photos.countPhotos(id, function (nb) {
			if (nb < 5) {
				Photos.move(id, photo, nb);
				resolve({ "status": "success", "msg": "Photo added" });
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
