const express = require('express');
const router = express.Router();
const { getColor } = require('../../../colorStore');

router.get('/get-color', (req, res) => {
    try {
        const color = getColor();
        res.send({ string: color });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ error: 'Internal server error' }); // Structured error response
    }
});

module.exports = router;
