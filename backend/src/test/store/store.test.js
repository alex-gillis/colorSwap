const request = require('supertest');
const express = require('express');
const session = require('express-session');
const storeRoute = require('../../src/api/store/store');
const { getColor } = require('../../../colorStore');

const app = express();
app.use(session({
    secret: 'testSecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000 }, // 10 seconds
}));
app.use(express.json());
app.use(storeRoute);

describe('POST /store', () => {
    it('should store color if no session is active', async () => {
        const response = await request(app)
            .post('/store')
            .send({ string: '#FF5733' });

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Color stored successfully!');
    });

    it('should block storing color if a session is active', async () => {
        const agent = request.agent(app); // Use agent to persist session
        await agent.get('/set-cookie'); // Simulate setting a session cookie

        const response = await agent.post('/store').send({ string: '#FF5733' });

        expect(response.statusCode).toBe(403);
        expect(response.body).toEqual({
            error: 'A session is active. Please wait until it expires before storing a new color.',
            remainingTime: expect.any(Number)
        });
    });
});
