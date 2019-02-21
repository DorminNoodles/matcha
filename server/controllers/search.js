const searchModel = require('../models/searchModel');

exports.getPeople = (data) => {
	return new Promise((resolve, reject) => {
		searchModel.getOrientation(data.id)
		.then((lookingfor) => {
			if (data.tri === "score") {
				searchModel.getPeopleByScore(data, lookingfor)
				.then((res) => {
					resolve(res);
				}).catch(() => {
					reject();
				})
			}
			else if (data.tri === "age") {
				searchModel.getPeopleByAge(data, lookingfor)
				.then((res) => {
					console.log(res);
					resolve(res);
				}).catch(() => {
					reject();
				})
			}
			else if (data.tri === "range") {
				searchModel.getPeopleByRange(data, lookingfor)
				.then((res) => {
					resolve(res);
				}).catch(() => {
					reject();
				})
			}
			else {
				searchModel.getPeopleByTag(data, lookingfor)
				.then((res) => {
					resolve(res);
				}).catch(() => {
					reject();
				})
			}
		}).catch((error) => {
			reject(error);
		})
	})
}