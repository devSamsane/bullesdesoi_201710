// Déclaration nodeJS
const path = require('path');

// Déclaration des librairies
const _ = require('lodash');
const glob = require('glob');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');

// Déclaration des fichiers de configuration


const plugins = gulpLoadPlugins();
const defaultAssets = require('./server/lib/config/assets/default');

/**
 * Gulp Task: Paramétrage de la variable NODE_ENV => `development`
 * @name env:test
 */
gulp.task('env:test', function() {
  process.env.NODE_ENV = 'development';
});

/**
 * Gulp Task: Intialisation de nodemon verbose et debug
 * @name nodemon
 */
gulp.task('nodemon', function() {
  return plugins.nodemon({
    script: 'server.js',
    nodeArgs: ['--harmony', '--debug', '--inspect'],
    ext: 'js, html',
    watch: _.union(defaultAssets.server.allJS, defaultAssets.server.config)
  });
});

/**
 * Gulp Task: Intialisation de nodemon sans verbose ou debug
 * @name nodemon-debug
 */
gulp.task('nodemon-debug', function() {
  return plugins.nodemon({
    script: 'server.js',
    nodeArgs: ['--harmony', '--debug', '--inspect'],
    ext: 'js, html',
    watch: _.union(defaultAssets.server.allJS, defaultAssets.server.config)
  });
});
