const Movies = require('./moviesModel.js');
const db = require('../data/dbConfig.js');

describe('movies model', function() {
beforeEach(async () => {
    await db('movies').truncate();
});

    describe('insert()', function() {
        it('should add the movie to the dB', async function() {  
            await Movies.insert({ name: 'Terminator 2' });
            await Movies.insert({ name: 'RoboCop' });
            const movies = await db('movies');
            expect(movies).toHaveLength(2);
        }); 

        it('should return a 201 created', function () {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(201);
                });
        });
        
    });

    describe('remove()', function() {
        it('should delete the movie from the dB', async function() {
            await Movies.insert({ name: 'RoboCop' });
            const movies = await db('movies');
            expect(movies).toHaveLength(1);
            
        })

        it('should return a 200 ok', function () {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
    })

});

// it.skip('auth example', function () {
//     return request(server)
//         .post('/login')
//         .send({ username: 'me', password: 'pass' })
//         .then(res => {
//             const token = res.body.token;
//             return request(server)
//                 .get('/')
//                 .set('Authorization', token)
//                 .then(res => {
//                     expect(res.status).toBe(200);
//                     expect(Array.isArray(res.body)).toBe(true);
//                 });
//         })
// });