const express = require('express');
const db = require('../../database/dbConfig.js');

const router = express.Router();

router.post('/', (req, res) => {
    try {
        db('games')
            .insert(req.body)
            .then(id => {
                res.status(201).json(id)
            })
            .catch(error => {
                res.status(422).json({
                    message: "Bad request, please provide required fields",
                    error
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Server could not post to the database",
            error
        })
    }
});

router.get('/', (req, res) => {
    db('games')
        .then(games => {
            res.status(200).json(games)
        })
        .catch(error => {
            res.status(500).json({
                message: "Server could not get games",
                error
            })
        })
});

router.get('/:id', (req, res) => {
    db('games')
        .where({ id: req.params.id })
        .first()
        .then(game => {
            res.status(200).json(game)
        })
});

module.exports = router