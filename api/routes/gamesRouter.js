const express = require('express');
const db = require('../../database/dbConfig.js');

const router = express.Router();

router.post('/', (req, res) => {
    db('games')
        .insert(req.body)
        .then(id => {
            res.status(200).json(id)
        })
        .catch(error => {
            res.status(400).json({
                message: "Bad request, please provide required fields",
                error
            })
        })
});

module.exports = router