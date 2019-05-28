const keystone = require('keystone');

const getPage = async (pageSlug) => {
  const PageModel = keystone.list('Page');
  const filter = {
    slug: pageSlug,
  };

  const pageData = await PageModel.model.findOne(filter, function(err, item) {
    if(err) {
      console.log('err', err);
      return null;
    }

    return item;
  });

  if(!pageData) {
    return {
      err: 'Página não encontrada',
    };
  }

  return {
    title: pageData.title,
    content: pageData.content,
  };
};

module.exports = {
  getPage,
};
