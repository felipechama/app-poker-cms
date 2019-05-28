const express = require('express');
const routes = express.Router();

const { getPage } = require('./api/page');
const { getPlayers } = require('./api/players');
const { getTournaments, getTournament } = require('./api/tournaments');

routes.get('/api/players', async (req, res) => {
  const allPlayers = await getPlayers();
  res.send(allPlayers);
});

routes.get('/api/tournaments', async (req, res) => {
  const allTournaments = await getTournaments();
  res.send(allTournaments);
});

routes.get('/api/page/:slug', async (req, res) => {
  const pageData = await getPage(req.params.slug);
  res.send(pageData);
});

module.exports = routes;
