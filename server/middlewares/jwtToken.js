const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const getJwtToken = (req, res, next) => {
	req.token = false;
	if (!req.headers['authorization']) {
		next();
		return;
	}
	const bearer = req.headers['authorization'].split(' ');
	const token = bearer[1];
	if (token) {
		var decoded = jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (err)
				return false;
			else
				return decoded;
		});
		req.token = decoded;
	}
	next();
}

module.exports = getJwtToken;
