const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const location = require('../controllers/location');
const axios = require('axios');

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

router.get('/position', urlencodedParser, (req, res) => {

    location.findLocationByIp()
        .then((response) => { res.status(200).send(response) })
        .catch((err) => { res.status(500).send(err) })
})

module.exports = router;
