// déclaration des librairies
const chalk = require('chalk');

// déclaration des fichiers de configuration
const config = require('./config/index');
const express = require('./services/express');

/**
 * Initialisation du server web
 * @name startExpress
 */
function startExpress () {
  return new Promise((resolve, reject) => {

    // Initialisation de l'application
    let app;
    try {
      app = express.init();
    } catch (error) {
      console.log(chalk.red(error));
      return reject(error);
    }

    return resolve(app);
  });
}

/**
 * Bootstrap des services
 * @name bootstrap
 * @return {object} app instance
 */
function bootstrap () {
  return new Promise(async (resolve, reject) => {
    let app;

    try {
      app = await startExpress();
    } catch (error) {
      return reject(new Error('Impossible d\'intialiser ExpressJS'));
    }

    return resolve(app);
  });
};

// Exposition publique de la fonction bootstrap
exports.bootstrap = bootstrap;

/**
 * Démarrage de l'application
 * @name start
 */
exports.start = function start () {
  return new Promise(async (resolve, reject) => {
    let app;

    try {
      app = await bootstrap();
    } catch (error) {
      return reject(error);
    }

    //Démarrage du server web sur le port et host
    app.listen(config.port, config.host, () => {
      const server = 'http://' + config.host + ':' + config.port;

      console.log(chalk.bgWhite('---'));
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environnement: ' + process.env.NODE_ENV));
      console.log(chalk.green('Serveur: ' + server));
      console.log(chalk.bgMagenta('App version: ' + config.bullesdesoi.version));
      console.log(chalk.bgWhite('---'));
    });

    return resolve({
      app: app
    });

  });
};