module.exports = (req, res, next) => {
    if (req.session && req.session.startTime) {
        const elapsedTime = Date.now() - req.session.startTime;
        const maxAge = req.session.cookie.maxAge;

        if (elapsedTime < maxAge) {
            return res.status(403).send({
                error: 'A session is active. Please wait until it expires before storing a new color.',
                remainingTime: (maxAge - elapsedTime) / 1000, // Remaining time in seconds
            });
        }
    }
    // If no active session, allow the request to proceed
    next();
};
