const express = require('express');
const app = express();

const { getPage } = require('./api/page');
const { getPlayers } = require('./api/players');
const { getTournaments, getTournament } = require('./api/tournaments');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/players', async (req, res) => {
  const allPlayers = await getPlayers();
  res.send(allPlayers);
});

app.get('/api/tournaments', async (req, res) => {
  const allTournaments = await getTournaments();
  res.send(allTournaments);
});

app.get('/api/tournament/:id', async (req, res) => {
  const tournamentData = await getTournament(req.params.id);
  res.send(tournamentData);
});

app.get('/api/page/:slug', async (req, res) => {
  const pageData = await getPage(req.params.slug);
  res.send(pageData);
});

module.exports = app;
