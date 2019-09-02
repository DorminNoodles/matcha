const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const reportModel = require('../models/reportModel');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', urlencodedParser, (req, res) => {
    if (!req.token) {
        res.status(401).send({ "status": "error", "msg": "bad authentification" });
    }

    reportModel.new(req.token.id, parseInt(req.body.id))
        .then((result) => { res.send(result); })
        .catch((err) => { res.send(err); });
})

module.exports = router;
