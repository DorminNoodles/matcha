const database = require('../controllers/database');

exports.new = (data) => {
    return new Promise((resolve, reject) => {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        database.connection()
            .then((conn) => {
                return conn.query('INSERT INTO notifs (to_id, from_id, type, date ) VALUES(?, ?, ?)', [data.to_id, data.from_id, data.type, date])
                    .then(() => { 
                        conn.end()
                        resolve({ "status": "success", "msg": 'notif saved' });
                     })
                    .catch(() => { reject({ "status": "error", "msg": "Bad query !" }); })
            })
            .catch((err) => { reject({ "status": "error", "msg": "Bad query !" }) })
    });
}

exports.get = (id) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                return conn.query('SELECT notifs.id, type, from_id, to_id, date, users.username,\
                (SELECT count(*) FROM notifs WHERE to_id=?) as count \
                FROM notifs \
                INNER JOIN users ON (users.id = from_id) \
                WHERE to_id=? ORDER BY date DESC', [id, id])
                    .then((res) => {
                        conn.end()
                        resolve({ "status": "success", data: res })
                    })
                    .catch((err) => reject({ "status": "error", "msg": "Bad query !" }))
            })
            .catch((err) => reject({ "status": "error", "msg": "Bad query !" }))
    });
}

exports.delete = (user_id, id) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                return conn.query('DELETE FROM notifs WHERE id=? AND to_id=?;', [id, user_id])
                    .then((res) => {
                        conn.end()
                        if (res.affectedRows === 1)
                            resolve({ "status": "success" })
                        else
                            reject({ "status": "error", "msg": "Bad query !" })
                    })
                    .catch(() => reject({ "status": "error", "msg": "Bad query !" }))
            })
            .catch(() => reject({ "status": "error", "msg": "Bad query !" }))
    });
}