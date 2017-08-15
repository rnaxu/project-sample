module.exports = {
  plugins: [
    require('stylelint'),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-cssnext')({
      browsers: ['last 2 versions', 'ie 11', 'iOS >= 8', 'Android >= 4']
    }),
    require('cssnano')({
      autoprefixer: false,
    }),
  ],
};
