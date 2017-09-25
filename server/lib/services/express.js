// déclaration nodeJS
const path = require('path');

// déclaration des librairies
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('express-hbs');

// déclaration des fichiers de configuration
const config = require('../config/index')

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
 * Configuration et export du moteur html
 * @name initViewEngine
 * @param app
 */
module.exports.initViewEngine = (app) => {
  app.engine('hbs', hbs.express4({
    partialsDir: path.resolve('./dist/views'),
    extname: '.html'
  }));
  app.set('view engine', 'hbs');
  app.set('views', path.resolve('./dist/views'));
};

/**
 * Configuration et export de la configuration assets.server
 * @name initModulesConfiguration
 * @param {object} app instance
 */
module.exports.initModulesConfiguration = (app) => {
  config.files.server.configs.forEach((configPath) => {
    require(path.resolve(configPath))(app);
  });
};

/**
 * Configuration et export des fichiers statiques
 * @name initModulesClientRoutes
 * @param {object} app instance
 */
module.exports.initModulesClientRoutes = (app) => {
  // Paramétrage du router et du répertoire de fichiers statiques
  app.use('/', express.static(path.resolve('./dist')));
  app.use('/', express.static(path.resolve('./dist/views')));
};

/**
 * Configuration et export de la configuration des routes server
 * @name initModulesServerRoutes
 * @param {object} app instance
 */
module.exports.initModulesServerRoutes = (app) => {
  // Route par defaut
  config.files.server.routes.forEach((routePath) => {
    require(path.resolve(routePath))(app);
  });
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

  // Initialisation du view engine
  this.initViewEngine(app);

  // Initialisation du module de configuration des routes statiques
  this.initModulesClientRoutes(app);

  // Initialisation du module de configuration
  this.initModulesConfiguration(app);

  // Initialisation routes
  this.initModulesServerRoutes(app);

  return app;
};
