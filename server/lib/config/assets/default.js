module.exports = {
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'server/lib/config/**/*.js', 'server/lib/config/index.js', 'server/modules/*/controllers/**/*.js'],
    models: ['server/modules/models/*.js'],
    config: ['server/modules/*/config/**/*.js'],
    routes: ['server/modules/*/routes/**/*.js']
  }
};
