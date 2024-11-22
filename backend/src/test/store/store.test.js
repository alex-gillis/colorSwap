const request = require('supertest');
const express = require('express');
const storeRoute = require('../../api/store/store'); 
const { setColor } = require('../../../colorStore');

jest.mock('../../../colorStore', () => ({
    setColor: jest.fn(),
}));

const app = express();
app.use(express.json()); 
app.use(storeRoute);

describe('POST /store', () => {
    it('should store the color successfully', async () => {
        const response = await request(app)
            .post('/store')
            .send({ string: '#FF5733' });

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Color stored successfully!');
        expect(setColor).toHaveBeenCalledWith('#FF5733');
    });

    it('should return a 400 error for invalid input', async () => {
        const response = await request(app)
            .post('/store')
            .send({});
    
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Color string is required and must be a valid hex color' });
    });    

    
    jest.spyOn(console, 'error').mockImplementation(() => {});

    afterEach(() => {
        jest.clearAllMocks();
    });
});
