const keystone = require('keystone');

const sortByName = (a, b) => {
  if(a.name < b.name) {
    return -1;
  }

  if(a.name > b.name) {
    return 1;
  }

  return 0;
};

const getPlayers = async () => {
  const PlayerModel = keystone.list('Player');

  const playersData = await PlayerModel.model.find({}, function(err, items) {
    if(err) {
      console.log('err', err);
      return [];
    }

    return items;
  });

  const players = [];

  for(key in playersData) {
    players.push({
      id: playersData[key]._id,
      name: playersData[key].name,
      slug: playersData[key].slug,
      championships: playersData[key].championships,
    });
  }

  players.sort(sortByName);

  return players;
};

module.exports = {
  getPlayers,
};
