const express = require('express');
const db = require('../../database/dbConfig.js');

const router = express.Router();

router.post('/', (req, res) => {
    try {
        db('games')
            .insert(req.body)
            .then(id => {
                res.status(200).json(id)
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
    
});

module.exports = router