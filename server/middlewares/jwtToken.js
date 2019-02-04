const jwt = require('jsonwebtoken');

const getJwtToken = (req, res, next) => {
	if (!req.headers['authorization'])
	{
		req.token = false;
		next();
		return;
	}
	const bearer = req.headers['authorization'].split(' ');
	const token = bearer[1];
	if (token) {
		var decoded = jwt.verify(token, 'shhhhhhh', (err, decoded) => {
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
