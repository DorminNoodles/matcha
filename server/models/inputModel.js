const userModel = require('../models/userModel.js');

exports.username = (username) => {
	return new Promise((resolve, reject) => {
		const usernameRegex = RegExp(/^[a-zA-Z0-9]*$/);
		const sizeRegex = RegExp(/^[a-zA-Z0-9]{2,28}$/);

		if (!username || username === '')
			reject({ "status": "error", "key": "username", "msg": "Username Empty !" });
		else if (!usernameRegex.test(username))
			reject({ "status": "error", "key": "username", "msg": "Username Bad Character!" });
		else if (!sizeRegex.test(username))
			reject({ "status": "error", "key": "username", "msg": "Username length must be between 2 and 28 character !" });
		else
			resolve({ "status": "success", "key": "username", "msg": '' });
	})
}

exports.usernameAlreadyTaken = (username, id) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByUsername(username, id)
			.then(() => {
				reject({ "status": "error", "key": "username", "msg": "Username already taken !" });
			})
			.catch((err) => {
				resolve({ "status": "success", "key": "username", "msg": '' });
			})
	})
}

exports.password = (password) => {
	return new Promise((resolve, reject) => {
		const passwordRegex = RegExp(/^\S*(?=\S{6,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/);
		if (passwordRegex.test(password))
			resolve({ "status": "success", "key": "password" });
		else
			reject({ "status": "error", "key": "password", "msg": "Bad Password !" });
	})
}

exports.firstname = (firstname) => {
	return new Promise((resolve, reject) => {
		if (!firstname)
			reject({ "status": "error", "key": "firstname", "msg": "Firstname missing !" });
		else if (!firstname.match(/^[A-zÀ-ÿ\-\. ]{2,23}$/))
			reject({ "status": "error", "key": "firstname", "msg": "Firstname bad Character !" });
		else if (!firstname.match(/^.{1,32}$/))
			reject({ "status": "error", "key": "firstname", "msg": "Firstname bad size !" });
		else
			resolve({ "status": "success", "key": "firstname", "msg": '' });

	})
}

exports.lastname = (lastname) => {
	return new Promise((resolve, reject) => {
		if (!lastname)
			reject({ "status": "error", "key": "lastname", "msg": "Lastname missing !" });
		else if (!lastname.match(/^[A-zÀ-ÿ\-\. ]{2,23}$/))
			reject({ "status": "error", "key": "lastname", "msg": "Lastname bad Character !" });
		else if (!lastname.match(/^.{1,32}$/))
			reject({ "status": "error", "key": "lastname", "msg": "Lastname bad size !" });
		else
			resolve({ "status": "success", "key": "lastname", "msg": '' });
	})
}

exports.email = (email) => {
	return new Promise((resolve, reject) => {
		var reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (email && email.match(reg))
			resolve({ "status": "success", "key": "email", "msg": '' });
		else
			reject({ "status": "error", "key": "email", "msg": "Bad email !" });
	})
}

exports.emailAlreadyTaken = (email, id) => {
	return new Promise((resolve, reject) => {
		userModel.findUserByEmail(email, id)
			.then(() => {
				reject({ "status": "error", "key": "email", "msg": "Email already taken !", "code": 400 });
			})
			.catch((err) => {
				resolve({ "status": "success", "key": "email", "msg": '' });
			})
	})
}

exports.location = (location, latidute, longitude) => {
	return new Promise((resolve, reject) => {
		if (!location || !latidute || latidute < 0 || !longitude || longitude < 0)
			reject({ "status": "error", "key": "location", "msg": "Bad location !" })
		else
			resolve({ "status": "success", "key": "location", "msg": '' });
	})
}

exports.message = (text) => {
	return new Promise((resolve, reject) => {
		if (!message)
			reject({ "status": "error", "key": "message", "msg": "Message Missing !" });
		else
			resolve({ "status": "success" });
	})
}

exports.avatar = (avatar) => {
	return new Promise((resolve, reject) => {

		if (!avatar || !avatar.name)
			reject({ "status": "error", "key": "avatar", "msg": "Avatar error !" })
		else
			resolve({ "status": "success" });
	})
}

exports.orientation = (orientation) => {
	return new Promise((resolve, reject) => {
		if (orientation) {
			if (orientation != "heterosexual" && orientation != "homosexual" && orientation != "bisexual")
				reject({ "status": "error", "key": "orientation", "msg": "Orientation not exist !" });
			else
				resolve({ "status": "success" });
		}
		else
			resolve({ "status": "success" });
	})
}

exports.gender = (gender) => {
	return new Promise((resolve, reject) => {
		if (!gender)
			reject({ "status": "error", "key": "gender", "msg": "Gender missing !" })
		else if (gender != "male" && gender != "female")
			reject({ "status": "error", "key": "gender", "msg": "Gender error !" })
		else
			resolve({ "status": "success" });
	})
}

exports.bio = (bio) => {
	return new Promise((resolve, reject) => {
		const regex = RegExp(/^[a-zA-Z0-9\s]*$/);
		// reject({ "status": "error", "key": "bio", "msg": "Bio missing !" })

		if (bio) {
			if (!regex.test(bio))
				reject({ "status": "error", "key": "bio", "msg": "Bio bad character !" })
			else
				resolve({ "status": "success" });
		}
		else
			resolve({ "status": "success" });
	})
}

exports.age = (age) => {
	return new Promise((resolve, reject) => {
		const regex = RegExp(/^[0-9]*$/);

		if (!age)
			reject({ "status": "error", "key": "age", "msg": "Age missing !" })
		else if (!regex.test(age))
			reject({ "status": "error", "key": "age", "msg": "Age bad character !" })
		else
			resolve({ "status": "success" });
	})
}

exports.ageRange = (ageMin, ageMax) => {
	return new Promise((resolve, reject) => {
		const regex = RegExp(/^[0-9]*$/);

		if (ageMin && ageMax) {
			if (!regex.test(ageMax) || !regex.test(ageMin))
				reject({ "status": "error", "key": "ageRange", "msg": "Age range bad characters !" });
			else if (ageMin < 18)
				reject({ "status": "error", "key": "ageRange", "msg": "Age range error !" });
			else
				resolve({ "status": "success" });
		}
		else
			resolve({ "status": "success" });

	})
}

exports.distance = (distance) => {
	return new Promise((resolve, reject) => {
		const regex = RegExp(/^[0-9]*$/);

		if (!distance)
			reject({ "status": "error", "key": "distance", "msg": "Distance missing !" });
		else if (!regex.test(distance))
			reject({ "status": "error", "key": "distance", "msg": "Distance bad characters !" });
		else
			resolve({ "status": "success" });
	})
}

exports.tag = (tag) => {
	return new Promise((resolve, reject) => {
		const regex = RegExp(/^[a-z0-9]*$/);

		if (!regex.test(tag))
			reject({ "status": "error", "key": "tag", "msg": "Tag error bad character !" });
		else
			resolve({ "status": "success" })

	})
}
