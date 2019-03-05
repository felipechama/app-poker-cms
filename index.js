require('dotenv').config();

var keystone = require('keystone');

keystone.init({
  'name': 'Poker Brothers CMS',
  'static': [],
  'auto update': true,
  'mongo': process.env.DB_URI,
  'auth': true,
  'user model': 'User',
  'cookie secret': '6D61822FBEAED8635A4A52241FEC3',
});

keystone.import('./models');

keystone.start();
