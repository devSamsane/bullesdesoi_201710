module.exports = {
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'server/lib/config/**/*.js', 'server/lib/config/index.js', 'server/modules/*/controllers/**/*.js', 'server/modules/*/config/**/*.js', 'server/modules/*/routes/**/*.js', 'server/modules/*/services/**/*.js', 'server/modules/*/repositories/**/*.js'],
    models: ['server/modules/models/*.js'],
    config: ['server/modules/*/config/**/*.js'],
    routes: ['server/modules/*/routes/**/*.js']
  }
};
