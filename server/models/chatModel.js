const database = require('../controllers/database');

exports.new = ({ to_id, group_id, from_id, message }) => {
    return new Promise((resolve, reject) => {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        database.connection()
            .then((conn) => {
                return conn.query('INSERT INTO chat (group_id, from_id, to_id, message) VALUES(?, ?, ?, ?)', [group_id, from_id, to_id, message])
                    .then(() => {
                        return conn.query('UPDATE userschat SET date=(NOW()) WHERE id=?', [group_id])
                            .then(() => {
                                return conn.query('INSERT INTO notifs (to_id, from_id, type, date) VALUES(?, ?, ?, ?)', [to_id, from_id, 1, date])
                                    .then((res) => { return { to_id, from_id, type: 1, date, id: res.insertId } })
                            })
                    }).then((data) => { resolve({ "status": "success", data }); })
                    .catch((err) => { reject({ "status": "error", "msg": "Bad query !" }) })
            })
            .catch((err) => {
                reject({ "status": "error", "msg": "Bad query !" });
            })
    });
}

exports.get = (user_id, id) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                return conn.query('SELECT users.username, users.avatar, userschat.id, chat.date, message, from_id, to_id \
                            FROM userschat \
                            INNER JOIN chat ON(chat.group_id=id) \
                            INNER JOIN users ON(users.id=?) \
                            WHERE first_user=LEAST(?, ?) AND second_user=GREATEST(?, ?) \
                            ORDER BY chat.date ASC;', [id, id, user_id, id, user_id])
                    .then((res) => {
                        return conn.query('SELECT id FROM userschat \
                        WHERE first_user=LEAST(?, ?) \
                        AND second_user=GREATEST(?, ?);', [id, user_id, id, user_id])
                            .then((result) => {
                                if (result && result[0] && result[0].id) { return ({ conversation: res, group_id: result[0].id }) }
                                else { reject({ "status": "error", "msg": "Bad query !" }); }
                            })
                    })
                    .then((res) => { resolve(res) })
                    .catch((err) => reject({ "status": "error", "msg": "Bad query !" }))
            })
            .catch((err) => reject({ "status": "error", "msg": "Bad query !" }))
    });
}

exports.list = (id) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                conn.query('SELECT users.avatar, userschat.active, username, first_user, second_user, date, users.id, userschat.id as group_id \
                         FROM userschat \
                         LEFT JOIN users ON (users.id=IF(first_user=?, second_user, first_user) && users.id IS NOT NULL) \
                         WHERE (first_user=? OR second_user=?) \
                         AND userschat.active=1 ORDER BY date DESC;'
                    , [id, id, id])
                    .then((res) => { resolve(res) })
                    .catch((err) => {
                        reject({ "status": "error", "msg": "Bad query !" });
                    })
            })
            .catch((err) => {
                reject({ "status": "error", "msg": "Bad query !" });
            })
    });
}