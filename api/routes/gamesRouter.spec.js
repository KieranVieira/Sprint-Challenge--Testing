const request = require('supertest');
const server = require('../server.js');

const db = require('../../database/dbConfig.js');

describe('Games Router', () => {
    afterEach(() => {
        return db('games').truncate()
    })
    describe('Post /games', () => {
        
    });
});