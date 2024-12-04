const express = require('express');
const router = express.Router();
const { getColor } = require('../../../colorStore');

router.get('/get-color', (req, res) => {
    try {
        const color = getColor(); // Generate the color
        res.send({ string: color || '' });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: 'Internal server error',
            image: 'https://http.cat/500',
        });
    }
});

module.exports = router;
