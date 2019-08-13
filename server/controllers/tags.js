const tagsModel = require('../models/tagsModel');
const inputModel = require('../models/inputModel');

exports.get = (body) => {
    console.log(body)
    console.log(JSON.stringify({ tags: [1, 2, 3] }));
    return new Promise((resolve, reject) => {
        if (body.id) {
            tagsModel.userTags(body.id)
                .then(() => {
                    resolve({ "status": "success", "msg": "Tags saved !" });
                })
                .catch((err) => {
                    reject(err);
                })
        }
        else if (body.tags) {
            tagsModel.getUserTag(tag)
            .then(() => {
                resolve({ "status": "success", "msg": "Tags saved !" });
            })
            .catch((err) => {
                reject(err);
            })
        }
    });

}