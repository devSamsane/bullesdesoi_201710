module.exports = {
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'config/index.js', 'modules/*/controllers/**/*.js'],
    models: ['modules/models/*.js'],
    config: ['modules/*/!(routes)/**/*.js'],
    routes: ['modules/*/routes/**/*.js']
  }
};
