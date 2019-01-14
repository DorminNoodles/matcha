//auth test

const User = require('../services/user');

let user = new User();
user.authenticate('boby', 'lou')
.then(() => {
	console.log('fuck');
})
.catch((err) => {
	console.log(err);
})
