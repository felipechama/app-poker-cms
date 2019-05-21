const keystone = require('keystone');

const getPage = (req, res) => {
  const Page = keystone.list('Page');
  const pageSlug = req.params.slug;
  const filter = {
    slug: pageSlug,
  };

  Page.model.findOne(filter, function(err, data) {
    if(err) {
      return res.send(err);
    }

    if(!data) {
      return res.send({
        err: 'Página não encontrada',
      });
    }

    const page = {
      title: data.title,
      content: data.content,
    };

    res.send(page);
  });
};

module.exports = getPage;
