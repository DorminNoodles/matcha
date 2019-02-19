const mysql = require('promise-mysql');

exports.checkOnline = (id) => {
    return new Promise((resolve, reject) => {
        mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'qwerty',
            database: 'matcha'
        }).then((conn) => {
            return conn.query("UPDATE users SET active=CURRENT_TIMESTAMP WHERE id=?", [id]);
        }).then((res) => {
            resolve();
            console.log(res);
        })
    }).catch((error) => {
        reject(error);
    })
}

exports.check = (table, user_id, his_id) => {
    return new Promise((resolve, reject) => {
        mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'qwerty',
            database: 'matcha'
        }).then((conn) => {
            conn.query("SELECT * FROM " + table + " WHERE user_id=? AND his_id=?", [user_id, his_id]);
        }).then((res) => {
            if (res.length != 0) {
                resolve();
                return 1;
            }
            else {
                reject();
                return 0;
            }
        })
    }).catch((error) => {
        reject();
    })
}

exports.notif = (msg, user_id, his_id) => {
    return new Promise((resolve, reject) => {
        check('block', user_id, his_id)
        .then((res) => {
            block = res;
            mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'qwerty',
                database: 'matcha'
        }).then((conn) => {
            if (block == 0) {
                conn.query('INSERT INTO notifs (user_id, his_id, notif) VALUES (?, ?, ?)', [user_id, his_id, msg]);
            }
        }).then((ans) => {
            resolve();
        })
    }).catch((error) => {
        reject(error);
    })
}

exports.getvisits = (user_id) => {
    return new Promise((resolve, reject) => {
        mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'qwerty',
            database: 'matcha'
        }).then((conn) => {
            conn.query('SELECT * FROM visits WHERE his_id = ?', [user_id]);
        }).then((res) => {
            resolve();
	    })
	}).catch((error) => {
        reject(error);
    })
}
