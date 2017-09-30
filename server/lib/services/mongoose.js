// Déclaration nodeJS
const path = require('path');

// Déclaration des librairies
const chalk = require('chalk');
const mongoose = require('mongoose');

// Déclaration des fichiers de configuration
const config = require('../config/index');

/**
 * Chargement des models mongoose
 * @name loadModels
 */
module.exports.loadModels = () => new Promise((resolve, reject) => {
  // Concaténation de l'ensemble des models
  config.files.server.models.forEach(modelPath => {
    require(path.resolve(modelPath));
  });

  resolve();
});

/**
 * Connexion au serveur MongoDB
 * Le serveur doit être démarré au préalable
 * @name connect
 */
module.exports.connect = () => new Promise((resolve, reject) => {
  mongoose.Promise = config.db.promise;
  const mongoOptions = {...config.db.options, useMongoClient: true};
  mongoose.connect(config.db.uri, mongoOptions)
    .then(() => {
      // Activation du mode debug si nécessaire
      mongoose.set('debug', config.db.debug);
      resolve(mongoose);
    })
    .catch(err => {
      console.error(chalk.red('Impossible de se connecter à Mongodb'));
      console.error(err);
      reject(err);
    });
});

/**
 * Déconnexion du serveur MongoDB
 * @name disconnect
 */
module.exports.disconnect = () => new Promise((resolve, reject) => {
  mongoose.disconnect(err => {
    console.info(chalk.yellow('Déconnexion du serveur mongoDB'));
    if (err) {
      reject(err);
    }
    resolve();
  });
});
