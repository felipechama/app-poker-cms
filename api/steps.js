const keystone = require('keystone');

const getSteps = async (tournamentId) => {
  const StepModel = keystone.list('Step');
  const filter = {
    active: true,
    tournament: tournamentId,
  };

  const stepsData = await StepModel.model.find(filter, function(err, items) {
    if(err) {
      console.log('err', err);
      return [];
    }

    return items;
  });

  const steps = [];

  for(key in stepsData) {
    steps.push({
      stepDate: stepsData[key].stepDate,
      classification: stepsData[key].classification,
    });
  }

  return steps;
};

module.exports = {
  getSteps,
};
