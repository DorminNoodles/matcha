const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const userModel = require('../models/userModel');
const inputModel = require('../models/inputModel');

var urlencodedParser = bodyParser.urlencoded({extended : false})


router.get('/:username', urlencodedParser, (req, res) => {
	inputModel.username(req.params.username)
	.then(() => {
		return userModel.findUserByUsername(req.params.username, 0);
	})
	.then((data) => {
		console.log(data);
		res.status(200).send({
			status: 'success',
			data: 'pictures/' + data.username + '/' + 'avatar_' + data.username + '_' + data.avatar,
		})
	})
	.catch((err) => {
		console.log(err);
		res.status(400).send({status: 'error'})
	})
})


module.exports = router;
