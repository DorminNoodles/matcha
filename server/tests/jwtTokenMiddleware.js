const jwtCheck = require('../middlewares/jwtToken.js');


let req = {'headers' : 'hello'};
let res;

jwtCheck(req, res, () => {
	console.log(req.token);
});
