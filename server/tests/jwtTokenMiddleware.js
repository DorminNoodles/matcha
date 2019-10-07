const jwtCheck = require('../middlewares/jwtToken.js');
const axios = require('axios');


let req = {'headers' : 'hello'};
let res;

axios.post('http://localhost:3000/api/user/authenticate', {
	username: 'Bobychou',
	password: 'Hello@oooooo2'
})
.then((response) => {
	// console.log("      90000 " + response.data.token);
	req.headers = {authorization: 'Bearer ' + response.data.token};
	jwtCheck(req, res, () => {
			console.log(req.token);
		});
})
.catch(() => {
	console.log("error");
	return;
})
