'use strict';

module.exports = {
  server: {
    allJS: ['server.js', 'config/**/*.js', 'modules/*/controllers/**/*.js'],
    config: ['modules/*/!(routes)/**/*.js'],
    routes: ['modules/*/routes/**/*.js']
  }
};