module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-url'),
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
      stage: 0,
    }),
  ],
};