var geocoder = require('geocoder');

exports.username = (username) => {
	return new Promise((resolve, reject) => {
		if (username && username.length >= 3) {
			resolve('ok');
		} else {
			reject('Username small');
		}
	})
}

exports.password = (password) => {
	return new Promise((resolve, reject) => {
		if (password && password.length >= 3) {
			resolve('ok');
		} else {
			reject('Password small');
		}
	})
}

exports.firstname = (firstname) => {
	return new Promise((resolve, reject) => {
		if (firstname && firstname.length >= 3) {
			resolve('ok');
		} else {
			reject('firstname too small');
		}
	})
}

exports.email = (email) => {
	return new Promise((resolve, reject) => {
		if (email && email.length >= 5) {
			resolve('ok');
		} else {
			reject('email too small');
		}
	})
}

exports.geoloc = (location) => {
	return new Promise((resolve, reject) => {
		if (location && location.length >= 5) {
			geocoder.geocode("Atlanta, GA", function ( err, data ) {
				console.log(data);
			// do something with data
			});

			resolve('ok');
		} else {
			reject('Location small');
		}
	})
}
