const request = require('supertest');
const server = require('../server.js');

const db = require('../../database/dbConfig.js');

describe('Games Router', () => {
    afterEach(() => {
        return db('games').truncate()
    })
    describe('Post /api/games', () => {
        it('Should return id 1 for added game', async() => {
            const res = await request(server).post('/api/games').send(
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                }
            );

            expect(res.body).toEqual([1]);
        });
        it('Should return json', async() => {
            const res = await request(server).post('/api/games').send(
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                }
            );

            expect(res.type).toBe('application/json');
        });
        it.skip('Should return 400 if required field not provided', () => {
            
        });
    });
});