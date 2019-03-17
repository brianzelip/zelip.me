// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Brian Zelip',
  siteUrl: 'https://zelip.me',
  siteDescription: "Brian Zelip's home page.",
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/content/**/*.md'
      }
    }
  ]
};
