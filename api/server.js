const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const gamesRouter = require('./routes/gamesRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/games', gamesRouter)

module.exports = server;