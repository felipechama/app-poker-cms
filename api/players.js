const keystone = require('keystone');
const { sortByName } = require('./utils');

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
    });
  }

  players.sort(sortByName);

  return players;
};

module.exports = {
  getPlayers,
};
