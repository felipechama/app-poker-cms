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
  replaceScore: {
    type: Types.NumberArray,
    label: 'Acordo na fase HU',
    note: 'Liste em ordem crescente a pontuação de cada jogador que fez acordo. Ex: Caso queira que os 2 primeiros jogadores fiquem com 80 pontos, coloque 80 duas vezes.',
  },
  active: {
    type: Types.Boolean,
    label: 'Publicar etapa',
    default: false,
  },
});

Step.defaultColumns = 'tournament, stepDate';
Step.register();
