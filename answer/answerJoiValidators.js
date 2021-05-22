const Joi = require('joi');

const createValidator = Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().greater(0).less(6),
    question_id: Joi.required()
});

const updateValidator = Joi.object({
    body: Joi.string(),
    rating: Joi.number().greater(0).less(6),
});

exports.createValidator = createValidator
exports.updateValidator = updateValidator