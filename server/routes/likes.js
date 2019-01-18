const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const likes = require('../controllers/likes');


var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', urlencodedParser, (req, res) => {
	console.log('post likes');
	console.log(req.body);
	likes.new({liker: req.body.liker, liked: req.body.liked})
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {

	});
})
