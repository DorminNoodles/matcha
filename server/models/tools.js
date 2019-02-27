const mysql = require('promise-mysql');
const checkTags = require('../services/checkInput');

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
            return conn.query("SELECT * FROM " + table + " WHERE user_id=? AND his_id=?", [user_id, his_id]);
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
        reject(error);
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
            })
        }).then((conn) => {
            if (block == 0)
                return conn.query('INSERT INTO notifs (user_id, his_id, notif) VALUES (?, ?, ?)', [user_id, his_id, msg]);
        }).then((ans) => {
            resolve();
        })
    }).catch((error) => {
        reject(error);
    })
}

exports.createTag = (tag, id) => {
    return new Promise((resolve, reject) => {
        checkTags.tag(tag)
        .then((res) => {
            mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'qwerty',
                database: 'matcha'
            })
        }).then((conn) => {
            return conn.query('INSERT INTO tags (user_id, tag) VALUES (?, ?)', [id, tag]);
        }).then((ret) => {
            resolve(ret);
        })
    }).catch((error) => {
        reject(error);
    })
}

exports.deleteTag = (tag, id) => {
    return new Promise((resolve, reject)=> {
        mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'qwerty',
            database: 'matcha'
        }).then((conn) => {
            return conn.query('DELETE FROM tags * WHERE tag=? AND user_id=?', [tag, id]);
        }).then((res) => {
            resolve(res);
        })
    }).catch((error) => {
        reject(error);
    })
}