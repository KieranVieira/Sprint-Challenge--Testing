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

            expect(res.status).toBe(201);
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

            const res = await request(server).get('/api/games');

            expect(res.body.length).toBe(1);
        });

        it('Should return empty array if list is empty', async() => {
            const res = await request(server).get('/api/games');

            expect(res.body).toEqual([]);
        });

        it('Should return 200 status', async() => {
            const res = await request(server).get('/api/games');

            expect(res.status).toBe(200);
        });

        it('Should return json', async() => {
            const res = await request(server).get('/api/games');

            expect(res.type).toBe('application/json');
        });

    });

    describe('Get /api/games/:id', () => {
        it('Should return game with given ID', async() => {
            await request(server).post('/api/games').send(
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                }
            );

            const res = await request(server).get('/api/games/1')

            expect(res.body.id).toBe(1);
        });

        it('Should return 404 if game with ID could not be found', async() => {
            const res = await request(server).get('/api/games/11234');

            expect(res.status).toBe(404);
        });

        it('Should return 200 if game was found', async() => {
            await request(server).post('/api/games').send(
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                }
            );

            const res = await request(server).get('/api/games/1')

            expect(res.status).toBe(200);
        });
    });

    describe('Delete /api/games/:id', () => {
        it('Should delete game with given id', async() => {
            const addedGame = await request(server).post('/api/games').send(
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                }
            );

            expect(addedGame.length).toBeTruthy()

            const res = await request(server).delete('/api/games/1')

            expect(res.body.length).toBeFalsy()
        });

        it.skip('Should return 404 if game could not be found', async() => {
            
        });
        
        it.skip('Should return 204 if game was deleted', () => {
            
        });
    });
});