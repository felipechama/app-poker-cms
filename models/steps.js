var keystone = require('keystone');
var Types = keystone.Field.Types;

var Step = new keystone.List('Step', {
  label: 'Etapas',
  nodelete: false,
  defaultSort: '-stepDate',
});

Step.add({
  tournament: {
    ref: 'Tournament',
    type: Types.Relationship,
    required: true,
    initial: true,
    label: 'Torneio',
  },
  stepDate: {
    type: Date,
    utc: true,
    initial: true,
    default: Date.now,
    label: 'Data da etapa',
  },
  jackpot: {
    type: Types.NumberArray,
    label: 'Premiação',
    note: 'Classifique de ordem crescente a premiação da etapa.',
  },
  classification: {
    many: true,
    ref: 'Player',
    type: Types.Relationship,
    label: 'Classificação',
  },
  halfScore: {
    type: Types.Boolean,
    label: 'Acordo na fase de HU (um contra um)',
    default: false,
    note: 'De acordo com a regra, caso for feito acordo o 1º e 2º colocado vão ficar com 80 pontos cada.',
  },
  active: {
    type: Types.Boolean,
    label: 'Publicar etapa',
    default: true,
  },
});

Step.defaultColumns = 'tournament, stepDate';
Step.register();
