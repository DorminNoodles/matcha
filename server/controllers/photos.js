const express = require('express');
const Photos = require('../services/photos');


exports.new = (id, photo) => {
	return new Promise((resolve, reject) => {
		console.log("NEW PHOTOS");
		console.log(id, " ",  photo);

		Photos.countPhotos(id, (nb) => {
			if (nb < 5) {
				Photos.move(id, photo);
				resolve({"status": "success", "msg" : "Photo added"});
			}
			else {
				Photos.removeTMP(photo);
				reject({"status": "error", "msg" : "photo limit reached"});
			}
		});
	});
}

exports.get = (id) => {
	return new Promise((resolve, reject) => {
		const fs = require('fs');
		let result = []
		fs.readdir('./public/pictures/user' + id, (err, files) => {
			files.forEach((el) => {
				result.push(el);
			})
			resolve({...result});
		})
	})
}

exports.delete = (id, filename) => {
	return new Promise((resolve, reject) => {
		const fs = require('fs');
		fs.unlink('./public/pictures/user' + id + '/' + filename, (err) => {
			if (err)
				reject({"status": "error", "msg" : "file not deleted check filename"});
			else
				resolve({"status": "success", "msg" : "file deleted"});
		})
	})
}
