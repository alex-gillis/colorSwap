const express = require('express');
const request = require('supertest');
const getColorRoute = require('../../api/get-color/get-color');
const { getColor } = require('../../../colorStore');

jest.mock('../../../colorStore', () => ({
    getColor: jest.fn(), 
}));

const app = express();
app.use(getColorRoute);

describe('Unit Tests for GET /get-color Endpoint', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    describe('Success Cases for GET /get-color', () => {
        it('should return the current color when getColor is successful', async () => {
            getColor.mockReturnValue('#FF5733');
            const response = await request(app).get('/get-color');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ string: '#FF5733' });
            expect(getColor).toHaveBeenCalledTimes(1);
        });

        it('should return an empty string when no color is set', async () => {
            getColor.mockReturnValue('');
            const response = await request(app).get('/get-color');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ string: '' });
            expect(getColor).toHaveBeenCalledTimes(1);
        });
    });

    describe('Failing Cases for GET /get-color', () => {
        it('should return a 500 error with an HTTP Cats image when getColor throws an exception', async () => {
            
            getColor.mockImplementation(() => {
                throw new Error('Mocked failure');
            });
    
            const response = await request(app).get('/get-color');
    
            expect(response.statusCode).toBe(500); 
            expect(response.body).toEqual({
                error: 'Internal server error',
                image: 'https://http.cat/500',
            });
            expect(getColor).toHaveBeenCalledTimes(1);
        });
    
        it('should return a 500 error with an HTTP Cats image when getColor returns a malformed value', async () => {
            
            getColor.mockReturnValue({ color: '#123456' });
    
            const response = await request(app).get('/get-color');
    
            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual({
                error: 'Internal server error',
                image: 'https://http.cat/500',
            });
            expect(getColor).toHaveBeenCalledTimes(1);
        });
    });
    
});
