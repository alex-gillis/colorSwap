const Joi = require('joi');
require('dotenv').config(); 

const schema = Joi.object({
    PORT: Joi.number().default(8080),
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
}).unknown(true); 

const { error, value } = schema.validate(process.env);

if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
}

module.exports = {
    port: value.PORT,
    nodeEnv: value.NODE_ENV,
};
