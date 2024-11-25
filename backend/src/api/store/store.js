const express = require('express');
const router = express.Router();
const { setColor } = require('../../../colorStore');

router.post('/store', (req, res) => {
    const { string } = req.body;

    // Validate input
    if (!string || typeof string !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(string)) {
        return res.status(400).send({ error: 'Color string is required and must be a valid hex color' });
    }

    try {
        setColor(string);
        res.send('Color stored successfully!');
    } catch (error) {
        console.error(error); 
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;
