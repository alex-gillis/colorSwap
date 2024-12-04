const express = require('express');
const router = express.Router();

router.get('/set-cookie', (req, res) => {
    req.session.startTime = Date.now(); // Set a session variable
    res.send('Session cookie has been set.');
});

module.exports = router;
