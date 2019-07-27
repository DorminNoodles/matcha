const userModel = require('../models/userModel.js');

exports.username = (username) => {
	return new Promise((resolve, reject) => {
		const usernameRegex = RegExp(/^[a-zA-Z0-9]*$/);
		if (username && usernameRegex.test(username))
			resolve(username);
		else
			reject({"status": "error", "key": "username", "msg": "Bad Username !"});
	})
}

exports.usernameAlreadyTaken = (username) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByUsername(username)
		.then(() => {
			reject({"status": "error", "key": "username", "msg": "Username already taken !"});
		})
		.catch((err) => {
			resolve();
		})
	})
}

exports.emailAlreadyTaken = (email) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByEmail(email)
		.then(() => {
			reject({"status": "error", "key": "email", "msg": "Email already taken !"});
		})
		.catch((err) => {
			resolve();
		})
	})
}

exports.password = (password) => {
	return new Promise((resolve, reject) => {
		const passwordRegex = RegExp(/^\S*(?=\S{6,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/);
		if (passwordRegex.test(password))
			resolve(password)
		else
			reject({"status": "error", "key": "password", "msg": "Bad Password !"});
	})
}

exports.firstname = (firstname) => {
	return new Promise((resolve, reject) => {
		firstname.match(/^\S*(?=\S*[A-Za-z])(?=\S{2,})/) ? resolve(firstname) : reject({"status": "error", "key": "firstname", "msg": "Bad Firstname !"});
	})
}

exports.lastname = (lastname) => {
	return new Promise((resolve, reject) => {
		lastname.match(/^\S*(?=\S*[A-Za-z])(?=\S{2,})/) ? resolve(lastname) : reject({"status": "error", "key": "lastname", "msg": "Bad Lastname !"});
	})
}

exports.email = (email) => {
	return new Promise((resolve, reject) => {
		var reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (email && email.match(reg))
			resolve(email);
		else
			reject({"status": "error", "key": "email", "msg": "Bad email !"});
	})
}

exports.location = (location) => {
	return new Promise((resolve, reject) => {
		// const locationRegex = RegExp(/^[0-9]{5,5}$/);
		// locationRegex.test(location) ? resolve(location) : reject(new Error('fail'));
		resolve(location);
	})
}

exports.message = (text) => {
	return new Promise((resolve, reject) => {
		console.log("HELLLO");
		resolve(text);
	})
}

exports.avatar = (avatar) => {
	return new Promise((resolve, reject) => {
		if (!avatar.file || !avatar.name)
			reject({ "status": "error", "key": "avatar", "msg": "Avatar error !" })
		else
			resolve({ "status": "success" });
	})
}

exports.gender = (text) => {
	return new Promise((resolve, reject) => {

		console.log('DEBRIEF');
		if (!text)
			reject({"status": "error", "key": "gender", "msg": "gender error"})
		else
			resolve(text);
	})
}

exports.orientation = (text) => {
	return new Promise((resolve, reject) => {

		console.log('DEBRIEF');
		if (!text)
			reject({"status": "error", "key": "orientation", "msg": "orientation error"})
		else
			resolve(text);
	})
}
