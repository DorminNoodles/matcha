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