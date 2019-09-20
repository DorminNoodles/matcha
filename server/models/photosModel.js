const database = require('../controllers/database');
const photosModel = require('../models/photosModel');
const fs = require('fs');

exports.new = (name, id) => {
    return new Promise((resolve, reject) => {
        database.connection()
            .then((conn) => { return conn.query('UPDATE users SET avatar=? WHERE id=?', [name, id]); })
            .then((res) => { resolve({ "status": "success", "msg": "report success" }); })
            .catch((err) => { reject({ "status": "error", "msg": "error db" }); })
    }).catch((err) => {
        reject({ "status": "error", "msg": "user not exist" });
    })
}

exports.countPhotos = (id, photo) => {
    return new Promise((resolve, reject) => {

        Photos.countPhotos(id, function (nb) {
            if (nb < 5) {
                var name = date + photo.name
                Photos.move(id, photo, name)
                resolve({ "status": "success", "msg": "Photo added", "photo": name });
            }
            else { reject({ "status": "error", "msg": "photo limit reached" }) }
        })
    })
}

exports.deleteFile = (id, path) => {
    return new Promise((resolve, reject) => {
        try {
            fs.unlinkSync('./public/pictures/' + id + '/' + path)
            resolve({ "status": "success", "msg": "delete previous profile picture" });

        } catch (err) {
            reject({ "status": "error", "msg": "bad query" });
        }
    })
}