const express = require('express');
const bodyParser = require('body-parser');

const users = require('../controllers/users');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.get('/', urlencodedParser, (req, res) => {

	console.log(req.query);

	users.getUsers().then((data) => {
		res.send(data);
	})

})

module.exports = router;
