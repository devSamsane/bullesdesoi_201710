// déclaration nodeJS
const path = require('path');
const glob = require('glob');
// const fs = require('fs');

// déclaration des librairies
const _ = require('lodash');
const chalk = require('chalk');

// déclaration des fichiers de configuration

/**
 * Récupération de l'ensemble des fichiers avec glob(pattern)
 * @name getGlobbedPaths
 * @param {object} globPatterns
 * @param {object} excludes
 * @return {object} output => liste l'ensemble des fichiers présents
 */
const getGlobbedPaths = (globPatterns, excludes) => {
  // déclaration du regex de récupération des dossiers
  const urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

  // intialisation de la variable de sortie
  let output = [];

  // Récupération des fichiers
  // globpatterns => déclaration des assets
  // si le paramètre globpatterns est un array alors il faut itérer sur tous les membres de l'array
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(globPattern => {
      // merge de la valeur output
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(file => {
          if (_.isArray(excludes)) {
            let i;
            for (i in excludes) {
              if (excludes.hasOwnProperty(i)) {
                file = file.replace(excludes[i], '');
              }
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }
  return output;
};

/**
 * Vérification du paramétrage de la variable d'env. NODE_ENV
 * @name validateEnvironmentVariable
 */
const validateEnvironmentVariable = () => {
  const environmentFiles = glob.sync(path.resolve(`./server/lib/config/env/${process.env.NODE_ENV}.js`));
  if (!environmentFiles.length) {
    if (!process.env.NODE_ENV) {
      console.warn(chalk.yellow('+ Alerte: Aucune configuration trouvée pour NODE_ENV'));
      console.warn(chalk.yellow('+ Paramétrage de l\'environnement par défaut: developpement'));
      process.env.NODE_ENV = 'development';
    } else {
      console.warn(chalk.yellow('++ Utilisation de l\'environnement paramétré'));
    }
  }
};

/**
 * Vérification du paramétrage de la variable domain
 * @name validateDomainIsSet
 * @param {object} config
 */
const validateDomainIsSet = config => {
  if (!config.domain) {
    console.error(chalk.red('+ Erreur: config.domain n\'est pas défini'));
  }
};

/**
 * Initialisation des répertoires server et client
 * @name initGlobalConfigFolders
 * @param {object} config
 * @param {object} assets
 */
const initGlobalConfigFolders = (config, assets) => {
  // Consolidation des répertoires
  config.folders = {
    server: {},
    client: {}
  };

  // Déclaration du répertoire client
  config.folders.client = `${process.cwd()}/dist/`;
};

/**
 * Initialisation des fichiers de configuration
 * @name initGlobalConfigFiles
 * @param {object} config
 * @param {object} assets
 */
const initGlobalConfigFiles = (config, assets) => {
  // Consolidation des fichiers
  config.files = {
    server: {},
    client: {}
  };

  // Récupération des models
  config.files.server.models = getGlobbedPaths(assets.server.models);

  // Récupération des routes
  config.files.server.routes = getGlobbedPaths(assets.server.routes);

  // Récupération des fichiers de configuration
  config.files.server.configs = getGlobbedPaths(assets.server.config);
};

/**
 * Initialisation de la configuration du serveur
 * @name initGlobalConfig
 */
const initGlobalConfig = () => {
  // Initialisation de la vérification de NODE_ENV
  validateEnvironmentVariable();

  // Récupération des assets par défaut
  const defaultAssets = require('../config/assets/default');

  // Récupération des assets selon l'environnement
  const environmentAssets = require(`../config/assets/${process.env.NODE_ENV}.js`);

  // Merge des assets
  const assets = _.merge(defaultAssets, environmentAssets);

  // Récupération de la configuration par défaut
  const defaultConfig = require('../config/env/default');

  // Récupération de la configuration selon l'environnement
  const environmentConfig = require(`../config/env/${process.env.NODE_ENV}.js`);

  // Merge de la configuration
  const config = _.merge(defaultConfig, environmentConfig);

  // Enrichissement des informations du package.json
  const pkg = require('../../../package.json');
  config.bullesdesoi = pkg;

  // Initialisation des fichiers de configurations
  initGlobalConfigFiles(config, assets);

  // Initialisation des répertoires
  initGlobalConfigFolders(config, assets);

  // Vérification que le domain est défini
  validateDomainIsSet(config);

  // Exposition des utilitaires de configuration
  config.utils = {
    getGlobbedPaths: getGlobbedPaths
  };

  return config;
};

/**
 * Déclaration de l'objet config
 */
module.exports = initGlobalConfig();
