const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : false})

router.post('/', urlencodedParser, (req, res) => {
	res.send("Pokemon");
});

router.get('/', urlencodedParser, (req, res) => {
	res.send("Pokemon");
});

router.get('/list', (req, res) => {
	// console.log(req.params);
	res.send("UserList");
});

module.exports = router;
