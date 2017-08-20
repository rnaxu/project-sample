import handlebars from 'handlebars';
import Metalsmith from 'metalsmith';
import models from 'metalsmith-models';
import collections from 'metalsmith-collections';
import inPlace from 'metalsmith-in-place';
import layouts from 'metalsmith-layouts';
import beautify from 'metalsmith-beautify';
import watch from 'metalsmith-watch';

const TARGET = process.env.npm_lifecycle_event;

const BUILD_MAP = {
  'build:html': {
    watch: () => null,
  },
  'dev:html': {
    watch: () => watch({
      paths: {
        '${source}/**/*': true,
        './src/hbs/**/*': '**/*',
      },
    }),
  },
};

Metalsmith(__dirname)
  .source('./src/hbs/pages')
  .destination('./dist')
  .clean(false)
  .use(models({
    directory: './src/hbs/data/',
  }))
  .use(collections({
    pages: {
      pattern: ['**/*.hbs', '!index.hbs'],
      sortBy: 'id',
    },
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: './src/hbs/layouts',
    partials: './src/hbs/partials',
    default: 'default.hbs',
    pattern: '**/*.hbs',
    rename: true,
  }))
  .use(inPlace({
    engine: 'handlebars',
    directory: './src/hbs/layouts',
    partials: './src/hbs/partials',
  }))
  .use(beautify({
    js: false,
    html: {
      indent_size: 4,
      indent_char: ' ',
      indent_with_tabs: false,
      indent_inner_html: false,
      preserve_newlines: false,
      wrap_line_length: 0,
      extra_liners: ' ',
      unformatted: ' ',
    },
  }))
  .use(BUILD_MAP[TARGET].watch())
  .build((err) => {
    if (err) throw err;
  });
