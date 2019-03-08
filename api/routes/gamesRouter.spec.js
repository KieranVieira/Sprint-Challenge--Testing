const request = require('supertest');
const server = require('../server.js');

const db = require('../../database/dbConfig.js');

describe('Games Router', () => {
    afterEach(() => {
        return db('games').truncate();
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

        it('Should return 200 code for added game', async() => {
            const res = await request(server).post('/api/games').send(
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                }
            );

            expect(res.status).toBe(200);
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
        it('Should return 400 if required field not provided', async() => {
            const res = await request(server).post('/api/games').send({
                title: 'Pacman'
            });

            expect(res.status).toBe(422)
        });
    });

    describe('Get /api/games', () => {
        it('Should get a list of games', async() => {
            await request(server).post('/api/games').send(
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                }
            );

            const res = await request(server).res('/api/games');

            expect(res.body.length).toBe(1);
        });

        it('Should return empty array if list is empty', () => {
            const res = await request(server).res('/api/games');

            expect(res.body).toEqual([]);
        });
    });
});