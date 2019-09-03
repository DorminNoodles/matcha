const mysql = require('promise-mysql');
const userModel = require('../models/userModel');

exports.new = (reporting, reported) => {
    return new Promise((resolve, reject) => {

        userModel.findUserById(reported, reporting).then((res) => {
            mysql.createConnection({
                port: process.env.PORT,
                host: 'localhost',
                user: 'root',
                password: 'qwerty',
                database: 'matcha'
            }).then((conn) => {
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