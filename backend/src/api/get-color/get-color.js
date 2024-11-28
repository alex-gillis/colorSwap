const Joi = require('joi');

const responseSchema = Joi.object({
    string: Joi.string().allow(''), 
});

router.get('/get-color', (req, res) => {
    try {
        const color = getColor();
        const response = { string: color || '' };

        const { error } = responseSchema.validate(response);
        if (error) {
            throw new Error('Invalid response structure');
        }

        res.send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
});
