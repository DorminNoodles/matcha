const likesModel = require('../models/likesModel');

likesModel.new({ liker: 1, liked: 2})
.then((res) => {
	console.log("OK !");
})
.catch((err) => {
	console.log("BAD !");
})
