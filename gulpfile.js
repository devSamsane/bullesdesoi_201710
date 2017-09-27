// Déclaration nodeJS

// Déclaration des librairies
const _ = require('lodash');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');

// Déclaration des fichiers de configuration

const plugins = gulpLoadPlugins();
const defaultAssets = require('./server/lib/config/assets/default');

/**
 * Gulp Task: Paramétrage de la variable NODE_ENV => `development`
 * @name env:dev
 */
gulp.task('env:dev', () => {
  process.env.NODE_ENV = 'development';
});

/**
 * Gulp Task: Intialisation de nodemon verbose et debug
 * @name nodemon
 */
gulp.task('nodemon', () => plugins.nodemon({
  script: 'server.js',
  nodeArgs: ['--harmony', '--debug', '--inspect'],
  ext: 'js, html',
  watch: _.union(defaultAssets.server.allJS, defaultAssets.server.config)
}));

/**
 * Gulp Task: Intialisation de nodemon sans verbose ou debug
 * @name nodemon-debug
 */
gulp.task('nodemon-debug', () => plugins.nodemon({
  script: 'server.js',
  nodeArgs: ['--harmony', '--debug', '--inspect'],
  ext: 'js, html',
  watch: _.union(defaultAssets.server.allJS, defaultAssets.server.config)
}));

/**
 * Gulp Task: Surveillance des modifications des fichiers
 * @name watch
 */
gulp.task('watch', () => {
  // Démarrage du rechargement en live
  plugins.refresh.listen();

  // Règles de surveillance
  gulp.watch(defaultAssets.server.allJS, ['lint']).on('change', plugins.refresh.changed);

  if (process.env.NODE_ENV === 'production') {
    gulp.watch(defaultAssets.server.gulpConfig, ['lint']);
  } else {
    gulp.watch(defaultAssets.server.gulpConfig, ['lint']);
  }
});

/**
 * Gulp Task: Tâche ESLint
 * @name eslint
 */
gulp.task('eslint', () => {
  const assets = _.union(
    defaultAssets.server.gulpConfig,
    defaultAssets.server.allJS
  );

  return gulp.src(assets)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});

/**
 * Gulp Sequence: Merge des tâches eslint et css
 * @name lint
 */
gulp.task('lint', done => {
  runSequence('eslint', done);
});

/**
 * Gulp Sequence: Merge des tâches env:dev, nodemon, watch
 * Démarrage de l'application en env. de développement
 * @name default
 */
gulp.task('default', done => {
  runSequence('env:dev', ['nodemon', 'watch'], done);
});

/**
 * Gulp Sequence: Merge des tâches env:dev, nodemon-debug, watch
 * Démarrage de l'application en env. de débug
 * @name debug
 */
gulp.task('debug', done => {
  runSequence('env:dev', ['nodemon-debug', 'watch'], done);
});
