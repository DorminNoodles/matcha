"use strict";
const axios = require('axios');

exports.findLocationByIp = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://api.ipify.org?format=json')
            .then((response) => { resolve(response.data.ip) })
            .catch((err) => { reject(err) })
    })
}

exports.findLocationByLatLong = (ip) => {
    return new Promise((resolve, reject) => {
        const iplocation = require("iplocation").default;

        iplocation(ip, [], (error, res) => {
            if (error)
                reject(error)
            else
                resolve({ city: res.city, latitude: res.latitude, longitude: res.longitude})
        })
    })
}