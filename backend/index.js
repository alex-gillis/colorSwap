const cors = require('cors');
const express = require('express');
const session = require('express-session');
const getColorRoute = require('./src/api/get-color/get-color');
const storeRoute = require('./src/api/store/store');
const setCookieRoute = require('./src/api/setCookie'); 

const app = express();

// Configure CORS
app.use(cors({
    origin: 'http://localhost:5173', // Update this to match your frontend's URL
    credentials: true, // Allow cookies to be sent
}));

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Configure session middleware
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 5 * 60 * 1000 }, // 5 minutes
}));

app.use(express.json()); // Middleware for parsing JSON

// Mount routes
app.use(getColorRoute);
app.use(storeRoute);
app.use(setCookieRoute);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
