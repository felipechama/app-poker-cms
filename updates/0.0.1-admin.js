var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (done) {
  new User.model({
    name: { first: 'Felipe', last: 'Chama' },
    email: 'felipechama42@gmail.com',
    password: 'admin',
    canAccessKeystone: true,
  }).save(done);
};
