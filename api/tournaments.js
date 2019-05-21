const keystone = require('keystone');

const getTournaments = (req, res) => {
  const Tournament = keystone.list('Tournament');
  const options = {
    sort: {
      'startAt': -1,
    }
  };

  Tournament.model.find({}, [], options, function(err, items) {
    if(err) {
      return res.send(err);
    }

    const tournaments = [];

    for(key in items) {
      tournaments.push({
        name: items[key].name,
        startAt: items[key].startAt,
        createdAt: items[key].createdAt,
      });
    }

    res.send(tournaments)
  });
};

module.exports = getTournaments;
