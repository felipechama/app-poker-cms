const express = require('express');
const routes = express.Router();

const getPlayers = require('./api/players');

routes.get('/api/players', getPlayers);

module.exports = routes;
