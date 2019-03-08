const request = require('supertest');
const server = require('../server.js');

const db = require('../../database/dbConfig.js');

describe('Games Router', () => {
    afterEach(() => {
        return db('games').truncate()
    })
    describe('Post /api/games', () => {
        it('Should return id 1 for added game', () => {
            const res = request(server).post('/api/games').send(
                {
                    title: 'Pacman', // required
                    genre: 'Arcade', // required
                    releaseYear: 1980 // not required
                }
            );

            expect(res.body).toEqual([1])
        });
        it.skip('Should return json', () => {
            
        });
        it.skip('Should return 400 if required field not provided', () => {
            
        });
    });
});