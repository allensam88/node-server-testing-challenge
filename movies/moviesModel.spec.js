const Movies = require('./moviesModel.js');
const db = require('../data/dbConfig.js');
const server = require('../api/server.js');
const request = require('supertest');

describe('movies model', function () {
    beforeEach(async () => {
        await db('movies').truncate();
    });

    describe('insert()', function () {
        it('should add the movie to the dB', async function () {
            await Movies.insert({ name: 'Terminator 2' });
            await Movies.insert({ name: 'RoboCop' });
            const movies = await db('movies');
            expect(movies).toHaveLength(2);
        });
    });

    describe('post request', function () {
        it('should return a 201 created', function () {
            return request(server)
                .post('/movies')
                .send({ name: 'RoboCop' })
                .then(res => {
                    expect(res.status).toBe(201);
                    // expect(res.type).toMatch(/json/i);
                });
        })
    });

    describe('remove()', function () {
        it('should delete the movie from the dB', function () {
            return request(server)
                .post('/movies')
                .send({ name: 'RoboCop' })
                .then (async res => {
                    const movies = await db('movies');
                    expect(movies).toHaveLength(1);
                    return request(server)
                        .delete('/movies/1')
                        .then(async res => {
                            expect(res.status).toBe(200);
                            expect(res.type).toMatch(/json/i);
                            expect(await db('movies')).toHaveLength(0);
                        })
                })
        })
    })
})
