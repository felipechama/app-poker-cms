const express = require('express');
const routes = express.Router();

const getPage = require('./api/page');
const getPlayers = require('./api/players');
const getTournaments = require('./api/tournaments');

routes.get('/api/players', getPlayers);
routes.get('/api/tournaments', getTournaments);
routes.get('/api/page/:slug', getPage);

module.exports = routes;
