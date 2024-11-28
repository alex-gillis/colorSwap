const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { setColor } = require('../../../colorStore');

const schema = Joi.object({
    string: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).required(), 
});

router.post('/store', (req, res) => {
    const { error } = schema.validate(req.body); 

    if (error) {
        return res.status(400).send({
            error: 'Invalid input',
            details: error.details,
        });
    }

    try {
        setColor(req.body.string);
        res.send('Color stored successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;
