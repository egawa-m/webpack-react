module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-simple-vars')({ silent: true }),
    // require('postcss-nested'),
    require('postcss-mixins'),
    require('postcss-nth-list'),
    require('postcss-calc'),
    require('postcss-color-function'),
    require('postcss-url'),
    require('postcss-preset-env')({
      browsers: [
        'ie >= 9',
        'iOS >= 7',
        'Android >= 4.1',
        'last 1 ChromeAndroid versions',
        'last 2 versions',
      ],
      stage: 0,
    }),
    require('cssnano'),
  ],
};