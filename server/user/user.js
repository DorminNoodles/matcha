const express = require('express');

const router = express.Router();


router.post('/createUser', (req, res) => {
	res.send('Create User');
})

router.get('/createUser', (req, res) => {
	res.send('Create User');
})

module.exports = router;
