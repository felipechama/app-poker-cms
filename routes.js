const express = require('express');
const routes = express.Router();

const getPlayers = require('./api/players');
const getTournaments = require('./api/tournaments');

routes.get('/api/players', getPlayers);
routes.get('/api/tournaments', getTournaments);

module.exports = routes;
