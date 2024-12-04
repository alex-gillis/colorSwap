const express = require('express');
const router = express.Router();
const { setColor } = require('../../../colorStore'); // Assume this handles storage logic

router.post('/store', (req, res) => {
    const { string: color } = req.body;

    // Validate the input
    const hexColorPattern = /^#[0-9A-Fa-f]{6}$/;
    if (!color || !hexColorPattern.test(color)) {
        return res.status(400).send({
            error: 'Invalid color format. Please provide a valid hex color code.',
        });
    }

    // Check for active session
    if (req.session && req.session.startTime) {
        const elapsedTime = Date.now() - req.session.startTime;
        const maxAge = req.session.cookie.maxAge;

        if (elapsedTime < maxAge) {
            return res.status(403).send({
                error: `You can't get a new color for another ${(maxAge - elapsedTime) / 1000} seconds`,
                remainingTime: (maxAge - elapsedTime) / 1000, // Remaining time in seconds
            });
        }
    }

    // Set the session and store the color
    try {
        req.session.startTime = Date.now(); // Set session start time
        setColor(color); // Store the color using your storage logic
        res.send('Color stored successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: 'Failed to store the color. Please try again later.',
        });
    }
});

module.exports = router;
