const Joi = require('joi');
require('dotenv').config(); // Load environment variables from .env

const schema = Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
}).unknown(true); // Allow additional environment variables

const { error, value } = schema.validate(process.env);

if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
}

module.exports = {
    port: value.PORT,
    nodeEnv: value.NODE_ENV,
};
