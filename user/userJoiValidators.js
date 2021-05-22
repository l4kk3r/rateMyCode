const Joi = require('joi');

const createValidator = Joi.object({
    name: Joi.string().required(),
    knownLanguages: Joi.array().items(Joi.string()).min(1).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

exports.createValidator = createValidator