module.exports = (req, res, next) => {
    if (!req.session.startTime) {
        return res.status(403).send('No session found. Please set a session first.');
    }

    const elapsedTime = Date.now() - req.session.startTime;
    const maxAge = req.session.cookie.maxAge;

    if (elapsedTime < maxAge) {
        return res.status(403).send({
            error: 'Session is still active. Please wait for the cookie to expire.',
            remainingTime: (maxAge - elapsedTime) / 1000, // Remaining time in seconds
        });
    }

    // If cookie has expired, allow the request
    next();
};
