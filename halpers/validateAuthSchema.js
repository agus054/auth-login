const joi = require("@hapi/joi");

const authSchema = joi.object({
    first_name: joi.string().min(3).lowercase().required(),
    last_name: joi.string().lowercase(),
    username: joi.string().min(3).uppercase().required(),
    password: joi.string().min(6).required(),
    email: joi.string().email().lowercase().required()
});

const authLogin = joi.object({
    username: joi.string().min(3).uppercase(),
    email: joi.string().lowercase(),
    password: joi.string().min(6)
});

module.exports.authLogin = authLogin;
module.exports.authSchema = authSchema;