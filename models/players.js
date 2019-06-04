var keystone = require('keystone');
var Types = keystone.Field.Types;
var path = require('path');

var Player = new keystone.List('Player', {
  label: 'Jogadores',
  plural: 'Jogadores',
  singular: 'Jogador',
  nodelete: false,
  autokey: {
    path: 'slug',
    from: 'name',
    unique: true,
  },
  defaultSort: 'name',
});

var PlayerImgStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('public/images'),
    generateFilename: function (file, index) {
      return file.originalname;
    },
    whenExists: 'error',
    publicPath: '/public/images',
  },
});

Player.add({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Types.File,
    storage: PlayerImgStorage,
    mimetype: '.jpeg, .jpg, .gif, .png',
  },
  championships: {
    type: Types.TextArray,
    label: 'Torneio que foi campeão',
    note: 'Digite o nome do torneio ou ano que foi premiado.',
  },
});

Player.defaultColumns = 'name, slug|20%';
Player.register();
