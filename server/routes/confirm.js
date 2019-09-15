const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const user = require('../controllers/user');

router.get('/changeEmailConfirm', (req, res) => {

	if (!req.query.key) {
		res.status(200).send({status: 'success'});
		return;
	}

	user.changeEmail(req.query.key)
	.then((result) => {
		res.status(200).send({status: 'success'});
		return;
	})
	.catch((result) => {
		console.log('error here');
		res.status(403).send({status: 'error'});
		return;
	})

})


module.exports = router;
