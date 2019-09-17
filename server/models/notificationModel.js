const database = require('../controllers/database');

exports.new = (data) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                return conn.query('INSERT INTO notifs (to_id, from_id, type ) VALUES(?, ?, ?)', [data.to_id, data.from_id, data.type])
                    .then((res) => { resolve({ "status": "success", "msg": 'notif saved' }); })
                    .catch((err) => { reject({ "status": "error", "msg": "Bad query !" }); })
            })
            .catch((err) => { reject({ "status": "error", "msg": "Bad query !" }) })
    });
}

exports.get = (id) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                return conn.query('SELECT type, from_id, to_id, date, users.username \
                FROM notifs \
                INNER JOIN users ON (users.id = from_id) \
                WHERE to_id=? ORDER BY date ASC', [id])
                    .then((res) => { resolve({ "status": "success", data: res }) })
                    .catch((err) => reject({ "status": "error", "msg": "Bad query !" }))
            })
            .catch((err) => reject({ "status": "error", "msg": "Bad query !" }))
    });
}