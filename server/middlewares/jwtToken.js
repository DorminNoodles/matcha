const jwt = require('jsonwebtoken');

const get = (str) => {
		console.log(str)

		return token;
}

const getJwtToken = (req, res, next) => {
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
