const mysql = require('promise-mysql');

exports.checkOnline = (id) => {
    return new Promise((resolve, reject) => {
        mysql.createConnection({
            host:'localhost',
			user:'root',
			password:'qwerty',
			database:'matcha'
        }).then((conn) => {
            return conn.query("UPDATE users SET ")
        })
    })
}