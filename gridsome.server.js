// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// import Bio from 'src/content/bio.md';

module.exports = function(api) {
  api.loadSource(store => {
    store.addContentType({
      typeName: 'Bio'
    });
  });
};
// module.exports = function(api) {
//   api.loadSource(store => {
//     const bio = store.addContentType({
//       typeName: 'Bio'
//     });

//     bio.addNode({
//       Bio
//     });
//   });
// };
