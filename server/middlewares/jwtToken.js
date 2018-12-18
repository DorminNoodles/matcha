const jwt = require('jsonwebtoken');

const get = (str) => {
		console.log(str)

		return token;
}

const getJwtToken = (req, res, next) => {
	if (!req.headers['authorization']) {
		next();
		return;
	}
	const bearer = req.headers['authorization'].split(' ');
	const token = bearer[1];
	// const token = jwtToken.get(req.headers['authorization']);
	if (token) {
		var decoded = jwt.verify(token, 'shhhhh', (err, decoded) => {
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
