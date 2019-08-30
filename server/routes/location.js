const express = require('express');
const bodyParser = require('body-parser');

const users = require('../controllers/users');
const axios = require('axios');

const router = express.Router();
require('dotenv').config()


var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', urlencodedParser, (req, res) => {

    return axios({
        method: 'GET',
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.query.city}.json`,
        params: {
            access_token: process.env.MAP_TOKEN,
            types: ["place"],
            country: ["FR"]
        },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then(response => {
        res.status(200).send(response.data.features)

    }).catch(error => {
        res.status(500).send(error)
    });
})

module.exports = router;
