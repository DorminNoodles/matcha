const database = require('../controllers/database');

exports.new = (to_id, from_id, type ) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                return conn.query('INSERT INTO notifs (to_id, from_id, type ) VALUES(?, ?, ?)', [to_id, from_id, type])
                    .then((res) => { resolve({ "status": "success", "msg": 'notif saved' }); })
                    .catch((err) => { reject({ "status": "error", "msg": "Bad query !" }); })
            })
            .catch((err) => { reject({ "status": "error", "msg": "Bad query !" }) })
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