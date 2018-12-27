
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
			var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (email && email.length >= 5 && re.test(email)) {
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
