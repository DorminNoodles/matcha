
exports.username = (username) => {
	return new Promise((resolve, reject) => {
		if (username && username.length >= 3) {
			resolve('ok');
		} else {
			reject('too small');
		}
	})
}

exports.password = (password) => {
	return new Promise((resolve, reject) => {
		if (password && password.length >= 3) {
			resolve('ok');
		} else {
			reject('too small');
		}
	})
}

exports.firstname = (firstname) => {
	return new Promise((resolve, reject) => {
		if (firstname && firstname.length >= 3) {
			resolve('ok');
		} else {
			reject('too small');
		}
	})
}

exports.email = (email) => {
	return new Promise((resolve, reject) => {
		if (email && email.length >= 5) {
			resolve('ok');
		} else {
			reject('too small');
		}
	})
}

exports.geoloc = (location) => {
	return new Promise((resolve, reject) => {
		if (email && email.length >= 5) {
			resolve('ok');
		} else {
			reject('too small');
		}
	})
}
