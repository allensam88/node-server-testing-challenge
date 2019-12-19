const express = require("express");

const Movies = require("../movies/moviesModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up", dbenv: process.env.DB_ENV });
});

server.get("/movies", (req, res) => {
  Movies.getAll()
    .then(movies => {
      res.status(200).json(movies);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/movies', (req, res) => {
    Movies.insert(req.body)
        .then(movie => {
            res.status(201).json(movie);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new movie.' });
        });
});

server.delete('movies/:id', (req, res) => {
    Movies.remove(req.params.id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ removed: deleted });
            } else {
                res.status(404).json({ message: 'Could not find movie with given id.' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete movie.' });
        });
});

module.exports = server;
