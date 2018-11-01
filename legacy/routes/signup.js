const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const User = require("../models/User")

var urlencodedParser = bodyParser.urlencoded({ extended: false })



module.exports = router
