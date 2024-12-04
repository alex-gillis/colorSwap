const express = require('express');
const request = require('supertest');
const getColorRoute = require('../../api/get-color/get-color');
const { getColor } = require('../../../colorStore');

jest.mock('../../../colorStore', () => ({
    getColor: jest.fn(),
}));

const app = express();
app.use(getColorRoute);

describe('GET /get-color Error Handling', () => {
    it('should return error information and an HTTP Cats image when an error occurs', async () => {
        // Mock the getColor function to throw an error
        getColor.mockImplementation(() => {
            throw new Error('Mocked failure');
        });

        const response = await request(app).get('/get-color');

        // Ensure the response status code is 500
        expect(response.statusCode).toBe(500);

        // Parse JSON response body (if necessary)
        const responseBody = typeof response.body === 'object' ? response.body : JSON.parse(response.text);

        // Assert the error response matches the expected structure
        expect(responseBody).toEqual({
            error: 'Internal server error',
            image: 'https://http.cat/500',
        });
    });
});
