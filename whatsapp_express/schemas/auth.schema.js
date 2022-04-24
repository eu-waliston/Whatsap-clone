const joi = require('joi');

const Schema = {
    register: joi.object().keys({
        username: joi.string().required(),
        email: joi.string().required(),
        phone: joi.string().required(),
        password: joi.string().required()
    }),
    login: joi.object().keys({
        phone: joi.string().required(),
        password: joi.string().required()
    }),
    checkEmail: joi.object().keys({
        email: joi.string().email().lowercase().required()
    }),
    checkUsername: joi.object().keys({
        username: joi.string().required()
    })
}

module.exports = Schema;
