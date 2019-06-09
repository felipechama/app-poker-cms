var keystone = require('keystone');
var Types = keystone.Field.Types;

var Tournament = new keystone.List('Tournament', {
  label: 'Torneiros',
  plural: 'Torneiros',
  singular: 'Torneio',
  nodelete: false,
  defaultSort: '-startAt',
});

Tournament.add({
  name: {
    type: String,
    required: true,
    label: 'Nome',
    initial: true,
  },
  createdAt: {
    type: Date,
    hidden: true,
    default: Date.now,
  },
  startAt: {
    type: Types.Datetime,
    default: Date.now,
    utc: true,
    initial: true,
    label: 'Início do torneio',
  },
  stepsDate: {
    type: Types.DateArray,
    label: 'Data das etapas',
  },
  score: {
    type: Types.NumberArray,
    label: 'Ranking de pontos',
    note: 'Classifique de ordem crescente a classificação do ranking para o torneio. O último valor cadastrado será utilizado para as posições subsequentes.',
  },
});

// Fix date when save
Tournament.schema.pre('save', function(next) {
  this.stepsDate = this.stepsDate.map(date => {
    const newDate = date;
    newDate.setHours(20, 59, 0, 0);
    newDate.setDate(newDate.getDate() + 1);

    return newDate;
  });

  next();
});

Tournament.defaultColumns = 'name, startAt';
Tournament.register();
