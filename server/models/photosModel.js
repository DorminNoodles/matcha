const database = require('../controllers/database');

exports.new = (name, id) => {
    return new Promise((resolve, reject) => {
            database.connection()
                .then((conn) => {
                    return conn.query('UPDATE users SET avatar=? WHERE id=?', [name, id]);
                }).then((res) => {
                    console.log("yes")
                    resolve({ "status": "success", "msg": "report success" });
                }).catch((err) => {
                    console.log(err)

                    reject({ "status": "error", "msg": "error db" });
                })
        }).catch((err) => {
            reject({ "status": "error", "msg": "user not exist" });
        })
}