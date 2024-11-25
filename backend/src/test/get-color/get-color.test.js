const request = require('supertest');
const express = require('express');
const getColorRoute = require('../../api/get-color/get-color'); 
const { getColor } = require('../../../colorStore');

jest.mock('../../../colorStore', () => ({
    getColor: jest.fn(),
}));

const app = express();
app.use(getColorRoute);

describe('GET /get-color', () => {
    it('should return the current color', async () => {
        getColor.mockReturnValue('#1A2B3C');

        const response = await request(app).get('/get-color');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ string: '#1A2B3C' });
    });

    it('should return a 500 status code if getColor fails', async () => {
        getColor.mockImplementation(() => {
            throw new Error('Internal server error');
        });

        const response = await request(app).get('/get-color');

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });

    jest.spyOn(console, 'error').mockImplementation(() => {});

    afterEach(() => {
        jest.clearAllMocks();
    });
    
});
