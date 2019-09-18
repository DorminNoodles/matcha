const Photos = require('../services/photos');
const photosModel = require('../models/photosModel');
const fs = require('fs');

exports.new = (id, photo, position, prev) => {
	return new Promise((resolve, reject) => {
		// console.log(id, photo, position, prev)
		if (position === "0") {
			var name = 'avatar_' + id + "_" + position + "_" + photo.name
			var prevName = 'avatar_' + id + "_0_" + prev
			const path = './public/pictures/' + id + '/' + prevName

			try {
				// fs.unlinkSync(path)
				photosModel.new(photo.name, id)
					.then(() => {
							Photos.move(id, photo, position)
							resolve({ "status": "success", "msg": "Photo added", "photo": name });
					}).catch(() => {
						fs.unlink('./public/pictures/' + id + '/' + name)
						reject({ "status": "error", "msg": "bad query" });
					})
			} catch (err) {
				console.error(err)
			}

		}


		// }
		// else {
		// 	Photos.countPhotos(id, function (nb) {
		// 		if (nb < 5 || (position === "0" && nb === 5)) {
		// 			var name = 'avatar_' + id + "_" + position + "_" + photo.name
		// 			Photos.move(id, photo, position)
		// 			resolve({ "status": "success", "msg": "Photo added", "photo": name });
		// 		}
		// 		else { reject({ "status": "error", "msg": "photo limit reached" }) }
		// 	})
		// }
		resolve({ "status": "success", "msg": "Photo added" });
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
