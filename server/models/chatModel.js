const database = require('../controllers/database');

exports.new = ({ to_id, group_id, from_id, message }) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                conn.query('INSERT INTO chat (group_id, from_id, to_id, message) VALUES(?, ?, ?, ?)', [group_id, from_id, to_id, message])
                    .then((res) => {
                        conn.query('UPDATE userschat SET date=(NOW()) WHERE id=?', [group_id])
                    }).then((res) => { resolve({ "status": "success", "msg": 'sending message succeed' }); })
                    .catch((err) => {
                        reject({ "status": "error", "msg": "Bad query !" });
                    })
            })
            .catch((err) => {
                reject(err);
            })
    });
}

exports.get = (user_id, id) => {
    return new Promise((resolve, reject) => {

        database.connection()
            .then((conn) => {
                conn.query('SELECT users.username, users.avatar, userschat.id, chat.date, message, from_id, to_id \
                            FROM userschat \
                            INNER JOIN chat ON(chat.group_id=id) \
                            INNER JOIN users ON(users.id=?) \
                            WHERE first_user=LEAST(?, ?) AND second_user=GREATEST(?, ?) ORDER BY chat.date ASC;'
                    , [id, id, user_id, id, user_id])
                    .then((res) => { resolve(res) })
                    .catch((err) => {
                        reject({ "status": "error", "msg": "Bad query !" });
                    })
            })
            .catch((err) => {
                reject(err);
            })
    });
}

exports.list = (id) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => {
                conn.query('SELECT userschat.active, username, first_user, second_user, date, users.id \
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
                reject(err);
            })
    });
}