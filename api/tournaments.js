const keystone = require('keystone');
const { getPlayers } = require('./players');
const { getSteps } = require('./steps');

const getPlayersInTournament = (players, steps) => (
  players.filter(player => steps.filter(step => step.classification.indexOf(player.id) > -1).length > 0)
);

const includeScoreAndJackpotAndPositionPlayers = (ranking, steps, scores) => {
  return ranking.map(player => {
    let scoreAcumulate = 0;
    let jackpotAcumulate = 0;
    let stepsPositions = [];

    steps.forEach(step => {
      const position = step.classification.indexOf(player.id);

      if(position >= 0) {
        // here
        // incluir no CMS replace de score para as posisões que houverem acordo
        scoreAcumulate += scores[position] ? scores[position] : scores[scores.length - 1];
        jackpotAcumulate += step.jackpot[position] ? step.jackpot[position] : 0;
        stepsPositions.push(position + 1);
      } else {
        stepsPositions.push(null);
      }
    });

    player.jackpotAcumulate = jackpotAcumulate;
    player.scoreAcumulate = scoreAcumulate;
    player.stepsPositions = stepsPositions;

    return player;
  });
};

const sortByScoreAndPositions = (a, b) => {
  let x = b.scoreAcumulate - a.scoreAcumulate;

  // TODO: melhorar esse trecho do código
  if(a.scoreAcumulate === b.scoreAcumulate) {
    /**
     * Regra: caso tenha dois ou mais jogadores com a mesma pontuação (score),
     *        posiciona jogadores de acordo com a posição em cada etapa.
     */
    const aStepsPositions = a.stepsPositions.filter(value => value !== null);
    const bStepsPositions = b.stepsPositions.filter(value => value !== null);
    const aMinPosition = Math.min(...aStepsPositions);
    const bMinPosition = Math.min(...bStepsPositions);
    let found = false;

    if(aMinPosition <= bMinPosition) {
      b.stepsPositions.forEach(bPosition => {
        if(!found && bPosition > aMinPosition) {
          found = true; // para a verificação
          x = false; // troca 'a' por 'b' de posição
        }
      });
    } else {
      a.stepsPositions.forEach(aPosition => {
        if(!found && aPosition > bMinPosition) {
          found = true; // para a verificação
          x = true; // troca 'b' por 'a' de posição
        }
      });
    }
  }

  return x;
};

const getRanking = (tournament, steps, players) => {
  let ranking = [];

  ranking = getPlayersInTournament(players, steps);
  ranking = includeScoreAndJackpotAndPositionPlayers(ranking, steps, tournament.score);
  ranking.sort(sortByScoreAndPositions);

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

  const stepsDate = tournamentData.stepsDate;
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
