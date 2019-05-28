const keystone = require('keystone');
const { getPlayers } = require('./players');
const { getSteps } = require('./steps');
const { formatDateToBr } = require('./utils');

const getPlayersInTournament = (players, steps) => (
  players.filter(player => steps.filter(step => step.classification.indexOf(player.id) > -1).length > 0)
);

const includeScoreAndPositionPlayers = (ranking, steps, scores) => {
  return ranking.map(player => {
    let totalScore = 0;
    let stepsPositions = [];

    steps.forEach(step => {
      const position = step.classification.indexOf(player.id);

      if(position >= 0) {
        // here
        // incluir no CMS replace de score para as posisões que houverem acordo
        totalScore += scores[position];
        stepsPositions.push(position + 1);
      } else {
        stepsPositions.push(null);
      }
    });

    player.scoreAcumulate = totalScore;
    player.stepsPositions = stepsPositions;

    return player;
  });
};

const sortBy = (key) => {
  return (a, b) => {
    if(a[key] < b[key]) {
      return 1;
    }

    if(a[key] > b[key]) {
      return -1;
    }

    return 0;
  };
};

const getRanking = (tournament, steps, players) => {
  let ranking = [];

  ranking = getPlayersInTournament(players, steps);
  ranking = includeScoreAndPositionPlayers(ranking, steps, tournament.score);
  ranking.sort(sortBy('scoreAcumulate'));
  // here
  // ordenar por stepsPositions

  return ranking;
};

const getJackpotTournament = (jackpotValue, steps) => {
  let jackpotAcumulate = 0;
  steps.forEach(step => jackpotAcumulate += step.classification.length * jackpotValue);
  return jackpotAcumulate;
};

const getTournament = async (tournamentId) => {
  const TournamentModel = keystone.list('Tournament');
  const filter = {
    _id: tournamentId,
  };

  const tournamentData = await TournamentModel.model.findOne(filter, function(err, item) {
    if(err) {
      console.log('err', err);
      return [];
    }

    return item;
  });

  if(!tournamentData) {
    return [];
  }

  const steps = await getSteps(tournamentData._id);
  const allPlayers = await getPlayers();

  const stepsDate = tournamentData.stepsDate.map(formatDateToBr);
  const ranking = getRanking(tournamentData, steps, allPlayers);
  const jackpotAcumulate = getJackpotTournament(10, steps);

  return {
    name: tournamentData.name,
    score: tournamentData.score,
    jackpotAcumulate,
    stepsDate,
    ranking,
  };
};

const getTournaments = async () => {
  const TournamentModel = keystone.list('Tournament');
  const options = {
    sort: {
      'startAt': -1,
    }
  };

  const tournamentsData = await TournamentModel.model.find({}, [], options, function(err, items) {
    if(err) {
      console.log('err', err);
      return [];
    }

    return items;
  });

  const tournaments = [];

  for(key in tournamentsData) {
    tournaments.push({
      id: tournamentsData[key]._id,
      name: tournamentsData[key].name,
      startAt: tournamentsData[key].startAt,
      createdAt: tournamentsData[key].createdAt,
    });
  }

  return tournaments;
};

module.exports = {
  getTournament,
  getTournaments,
};
