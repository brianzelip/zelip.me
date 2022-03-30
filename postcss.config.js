module.exports = {
  plugins: [
    require('postcss-import'),
    require('@fullhuman/postcss-purgecss')({
      content: ['src/**/*.html'],
      css: ['src/css/styles.css'],
      safelist: ['p'],
    }),
    require('autoprefixer'),
    require('cssnano'),
  ],
};
