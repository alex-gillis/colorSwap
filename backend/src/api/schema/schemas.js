const Joi = require('joi');

const colorSchema = Joi.object({
    string: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).required(),
});

module.exports = { colorSchema };
