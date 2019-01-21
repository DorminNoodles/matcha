const jwt = require('jsonwebtoken');

const get = (str) => {
		console.log(str)

		return token;
}

const getJwtToken = (req, res, next) => {
	console.log("here");
	if (!req.headers['authorization'])
	{
		req.token = false;
		next();
		return;
	}
	console.log("here");
	const bearer = req.headers['authorization'].split(' ');
	const token = bearer[1];
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
