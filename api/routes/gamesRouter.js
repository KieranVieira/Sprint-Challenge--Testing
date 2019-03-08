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
        })
});

module.exports = router