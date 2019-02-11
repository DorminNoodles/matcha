const express = require('express');
const Photos = require('../services/Photos');


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
		fs.readdir('./pictures/user' + id, (err, files) => {
			files.forEach((el) => {
				result.push(el);
			})
			resolve({...result});
		})
	})
}
