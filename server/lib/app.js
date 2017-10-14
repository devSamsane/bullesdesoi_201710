// Déclaration nodeJS

// Déclaration des librairies
const chalk = require('chalk');

// Déclaration des fichiers de configuration
const config = require('./config/index');
const express = require('./services/express');
const mongoose = require('./services/mongoose');
const SeedService = require('./services/seed');

/**
 * Etablissement de la connexion à MongoDB
 * Instanciation des models
 * @name startMongoose
 * @returns {object} dbConnection
 */
function startMongoose () {
  return new Promise((resolve, reject) => {
    mongoose.loadModels()
      .then(mongoose.connect)
      .then(dbConnection => {
        resolve(dbConnection);
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Initialisation du seeding
 * @name startSeeding
 */
function startSeeding () {
  return new Promise((resolve, reject) => {
    if (config.seedDB.seed === 'active') {
      console.info(chalk.bold.blue('Information: La fonction seed est active'));
      SeedService.start()
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    } else {
      console.info(chalk.bold.blue('Information: La fonction seed est inactive'));
    }
  });
}

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
    let db;
    let seed;

    try {
      db = await startMongoose();
      app = await startExpress();
      seed = await startSeeding();
    } catch (error) {
      return reject(new Error('Impossible d\'intialiser ExpressJS, le service Mongoose ou le seeding'));
    }
    return resolve({
      db: db,
      app: app,
      seed: seed
    });
  });
}

// Exposition publique de la fonction bootstrap
exports.bootstrap = bootstrap;

/**
 * Démarrage de l'application
 * @name start
 */
exports.start = function start () {
  return new Promise(async (resolve, reject) => {
    let app;
    let db;

    try {
      ({ db, app } = await bootstrap());
    } catch (error) {
      return reject(error);
    }

    // Démarrage du server web sur le port et host
    app.listen(config.port, config.host, () => {
      const server = `http://${config.host}:${config.port}`;

      console.info(chalk.white('---'));
      console.info(chalk.green(config.app.title));
      console.info();
      console.info(chalk.green(`Environnement:    ${process.env.NODE_ENV}`));
      console.info(chalk.green(`Serveur:          ${server}`));
      console.info(chalk.green(`Database:         ${config.db.uri}`));
      console.info(chalk.bgMagenta(`App version:  ${config.bullesdesoi.version}`));
      console.info(chalk.white('---'));
    });

    return resolve({
      db: db,
      app: app
    });
  });
};
