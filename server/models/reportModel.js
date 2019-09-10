const mysql = require('promise-mysql');
const userModel = require('../models/userModel');
const database = require('../controllers/database');

exports.new = (reporting, reported) => {
    return new Promise((resolve, reject) => {

        userModel.findUserById(reported, reporting).then((res) => {
            database.connection()
                .then((conn) => {
                    return conn.query('INSERT INTO report (`reporting`, `reported`) \
							VALUES (?, ?)', [reporting, reported]);
                }).then((res) => {
                    resolve({ "status": "success", "msg": "report success" });
                }).catch((err) => {
                    reject({ "status": "error", "msg": "error db" });
                })
        }).catch((err) => {
            reject({ "status": "error", "msg": "user not exist" });
        })
    })
}