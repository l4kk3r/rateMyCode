const Joi = require('joi');

const questionValidator = Joi.object({
    title: Joi.string().min(10).max(75).required(),
    code: Joi.string().min(10).max(10000).required(),
    language: Joi.string().min(1).max(50).required()
});

module.exports = questionValidator