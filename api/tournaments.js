const keystone = require('keystone');

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
  getTournaments,
};
