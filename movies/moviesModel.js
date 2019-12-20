const db = require('../data/dbConfig.js');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};


function getAll() {
    return db('movies');
}

function findById(id) {
    return db('movies')
        .where({ id })
        .first();
}

async function insert(movie) {
    return db('movies')
        .insert(movie, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

async function update(id, changes) {
    return null;
}

function remove(id) {
    const deletedMovie = findById(id).then(item => item);
    console.log('deleted movie', deletedMovie)
    return db('movies')
        .where({ id })
        .del()
        .then(count => {
            return deletedMovie
        });
}