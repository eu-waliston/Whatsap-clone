const joi = require('joi');

const Schema = {
    add: joi.object().keys({
        user_id: joi.string().required(),
        contact_id: joi.string().required(),
        contact_username: joi.string().required(),
        // contact_image: joi.string().required(),
    })
}

module.exports = Schema;