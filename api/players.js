const keystone = require('keystone');
const { sortByName } = require('./utils');

const getPlayers = (req, res) => {
  const Player = keystone.list('Player');

  Player.model.find({}, function(err, items) {
    if(err) {
      return res.send(err);
    }

    const players = [];

    for(key in items) {
      players.push({
        name: items[key].name,
        slug: items[key].slug,
      });
    }

    players.sort(sortByName);

    res.send(players)
  });
};

module.exports = getPlayers;
