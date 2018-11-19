var geocoder = require('geocoder');

exports.username = (username) => {
	return new Promise((resolve, reject) => {
		if (username && username.length >= 3) {
			resolve('ok');
		} else {
			reject('Username too small');
		}
	})
}

exports.password = (password) => {
	return new Promise((resolve, reject) => {
		if (password && password.length >= 3) {
			resolve('ok');
		} else {
			reject('Password too small');
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

// exports.email = (email) => {
// 	return new Promise((resolve, reject) => {
// 		if (email && email.length >= 5) {
// 			resolve('ok');
// 		} else {
// 			reject('email too small');
// 		}
// 	})
// }

exports.email = (email) => {
	return new Promise((resolve, reject) => {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email && email.length >= 5 && re.test(email)) {
			console.log('email ok');
			resolve('email ok');
		} else {
			reject('email too small');
		}
	})
}

exports.geoloc = (location) => {
	return new Promise((resolve, reject) => {
		if (location && location.length >= 2) {
			// geocoder.selectProvider("geonames",{"username":"dormin"});
			// geocoder.geocode(location, function ( err, data ) {
			// 	console.log(data);
			// // do something with data
			// });

			resolve('ok');
		} else {
			reject('Location too small');
		}
	})
}
