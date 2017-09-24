// déclaration nodeJS
const path = require('path');

// déclaration des librairies
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// déclaration des fichiers de configuration


/**
 * Configuration et export du module middleware
 * Active l'ensemble des middlewares déclarés pour app
 * @name initMiddleware
 * @param {object} app instance
 */
module.exports.initMiddleware = (app) => {
  // Compression
  app.use(compress({
    filter: function (req, res) {
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Body-parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
};

/**
 * Configuration et export de la configuration des routes server
 * @name initModulesServerRoutes
 * @param {object} app instance
 */
module.exports.initModulesServerRoutes = (app) => {
  // Route par defaut
  // TODO: pour le moment un res.send uniquement pour valider que la configuration fonctionne, il faudra le modifier par la suite

};

/**
 * Configuration et export des fichiers statiques
 * @name initModulesClientRoutes
 * @param {object} app instance
 */
module.exports.initModulesClientRoutes = (app) => {
  // Paramétrage du router et du répertoire de fichiers statiques
  app.use('/', express.static(__dirname + '/dist'));
};

/**
 * Export module 'app', création de l'application Express
 * @name init
 * @returns {*} app express
 */
module.exports.init = () => {
  // Déclaration de l'application ExpressJS
  const app = express();

  // Initialisation des middlewares
  this.initMiddleware(app);

  // Initialisation du module de configuration des routes statiques
  this.initModulesClientRoutes(app);

  // Initialisation routes
  this.initModulesServerRoutes(app);

  return app;
};
