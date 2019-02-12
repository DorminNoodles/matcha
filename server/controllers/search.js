const searchModel = require('../models/searchModel');

exports.getPeople = (data) => {
	return new Promise((resolve, reject) => {
		if (data.tri === "score") {
			searchModel.getPeopleByScore(data)
			.then((res) => {
				resolve(res);
			}).catch(() => {
				reject();
			})
		}
		else if (data.tri === "age") {
			searchModel.getPeopleByAge(data)
			.then((res) => {
				console.log(res);
				resolve(res);
			}).catch(() => {
				reject();
			})
		}
		else {
			searchModel.getPeopleByRange(data)
			.then((res) => {
				resolve(res);
			}).catch(() => {
				reject();
			})
		}
	})
}