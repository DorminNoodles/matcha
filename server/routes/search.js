const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../controllers/search');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', urlencodedParser, (req, res) => {

	let data = {
		"id": req.token.id,
		"tri": req.query.tri,
		"limitAgeMin": req.query.limitAgeMin,
		"limitAgeMax": req.query.limitAgeMax,
		"range": req.query.range,
		"order": req.query.order,
		"tags": req.query.tags
	};

	if (req.token) {
		console.log(req.query);
		// console.log(req.query.limitAgeMax);
		user.getPeople(data)
		.then((res) => {
			res.status(200).send({"status": "profiles found"});
		}).catch((error) => {
			res.send("error");
		})
	}
	else {
			res.status(403).send({"status": "error: not connected"});
	}
})



// get => api/users?tri=asc&limitAgeMin=18&limitAgeMax=19&range=20&tags[]="vegan"&tags[]="clope"

module.exports = router;