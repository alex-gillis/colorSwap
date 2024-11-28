const Joi = require('joi');
const config = require('../../config');
require('dotenv').config();

const schema = Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
}).unknown(true); 

const { error, value } = schema.validate(process.env);

if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
}

console.log(`Database URL: ${config.dbUrl}`);

module.exports = value; 