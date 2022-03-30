module.exports = function (eleventyConfig) {
  // Return your Object options:
  eleventyConfig.addWatchTarget('src/css/dist/');
  eleventyConfig.addPassthroughCopy('src/css/dist/');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/*.txt');

  return {
    dir: {
      input: './src',
      includes: '_includes',
      layouts: '_layouts',
    },
    htmlTemplateEngine: 'njk',
    templateFormats: ['html', 'njk', 'md'],
  };
};
