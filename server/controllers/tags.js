const tagsModel = require('../models/tagsModel');
const inputModel = require('../models/inputModel');

exports.user = (query) => {
    return new Promise((resolve, reject) => {
        if (query.user_id) {
            tagsModel.user(query.user_id)
                .then((res) => { resolve(res) })
                .catch((err) => { reject(err); })

        }
    });
}

exports.get = (tag) => {
    return new Promise((resolve, reject) => {
        tagsModel.get(tag)
            .then((res) => { resolve(res) })
            .catch((err) => { reject(err); })
    });
}