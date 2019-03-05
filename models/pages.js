var keystone = require('keystone');
var Types = keystone.Field.Types;

var Page = new keystone.List('Page', {
  label: 'Páginas',
  nodelete: false,
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  defaultSort: 'title',
});

Page.add({
  title: {
    type: String,
    initial: true,
    required: true,
    label: 'Título',
  },
  slug: {
    type: String,
    noedit: true,
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 500,
    label: 'Conteúdo',
  },
});

Page.defaultColumns = 'title, slug';
Page.register();
