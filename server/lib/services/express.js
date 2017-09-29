// Déclaration nodeJS
const path = require('path');

// Déclaration des librairies
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('express-hbs');
// REVIEW: Lusca configuration nécessaire si utilisation d'une session vs token
// const lusca = require('lusca');
const helmet = require('helmet');

// Déclaration des fichiers de configuration
const config = require('../config/index');
// REVIEW: A enlever si non nécessaire par la suite
// const log = require('./logger').log();
const expressLogger = require('./logger').logExpress();

/**
 * Initialisation des variables locales expressJS
 * @name initLocalVariables
 * @param {object} app instance
 */
module.exports.initLocalVariables = app => {
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  app.locals.keywords = config.app.keywords;
  app.locals.env = process.env.NODE_ENV;
  app.locals.domain = config.domain;

  // Passage des paramètres URL de la requête aux variables locales
  app.use((req, res, next) => {
    res.locals.host = `${req.protocol}://${req.hostname}`;
    res.locals.url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
    next();
  });
};

/**
 * Initialisation et export du module middleware
 * Active l'ensemble des middlewares déclarés pour app
 * @name initMiddleware
 * @param {object} app instance
 */
module.exports.initMiddleware = app => {
  // Compression
  app.use(compress({
    filter: function (req, res) {
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Utilisation du logger
  app.use(expressLogger);

  // Body-parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
};

/**
 * Initialisation et export du moteur html
 * @name initViewEngine
 * @param app
 */
module.exports.initViewEngine = app => {
  app.engine('hbs', hbs.express4({
    partialsDir: path.resolve('./dist/views'),
    extname: '.html'
  }));
  app.set('view engine', 'hbs');
  app.set('views', path.resolve('./dist/views'));
};

/**
 * Initialisation et export du middleware helmet
 * @name initHelmetHeaders
 * @param {object} app instance
 */
module.exports.initHelmetHeaders = app => {
  // Définition du max_age pour la configuration hsts (Strict-Transport-Security HTTP)
  // Le navigateur visitera seulement le site en https pour les visites dans les max_age jours
  const SIX_MONTHS = 15778476000;

  app.use(helmet.frameguard()); // Protection clickjacking
  app.use(helmet.xssFilter()); // Protection XSS (faible)
  app.use(helmet.noSniff()); // Protection sniffing MIME type
  app.use(helmet.ieNoOpen()); // Configuration X-Download-Options IE8+
  app.use(helmet.hsts({
    maxAge: SIX_MONTHS,
    includeSubdomains: true,
    force: true
  }));
  app.use(helmet.hidePoweredBy()); // Ne pas afficher x-powered-by
};

/**
 * Initialisation et export de la configuration assets.server
 * @name initModulesConfiguration
 * @param {object} app instance
 */
module.exports.initModulesConfiguration = app => {
  config.files.server.configs.forEach(configPath => {
    require(path.resolve(configPath))(app);
  });
};

/**
 * Initialisation et export des fichiers statiques
 * @name initModulesClientRoutes
 * @param {object} app instance
 */
module.exports.initModulesClientRoutes = app => {
  // Paramétrage du router et du répertoire de fichiers statiques
  app.use('/', express.static(path.resolve('./dist')));
  app.use('/', express.static(path.resolve('./dist/views')));
};

/**
 * Initialisation et export de la configuration des routes server
 * @name initModulesServerRoutes
 * @param {object} app instance
 */
module.exports.initModulesServerRoutes = app => {
  // Route par defaut
  config.files.server.routes.forEach(routePath => {
    require(path.resolve(routePath))(app);
  });
};

/**
 * Initialisation de la gestion des erreurs
 * @name initErrorRoutes
 * @param {object} app instance
 */
module.exports.initErrorRoutes = app => {
  app.use((err, req, res, next) => {
    // Vérification qu'une erreur existe bien
    if (!err) {
      return next;
    }

    // Si elle existe, on logge l'erreur
    console.error(err.stack);

    // Construction de la réponse erreur
    // Envoi de l'erreur et du code erreur
    return res.status(err.status).send({
      message: err.message,
      code: err.code
    });
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

  // Activation des variables locales
  this.initLocalVariables(app);

  // Activation des middlewares
  this.initMiddleware(app);

  // Activation de Helmet
  this.initHelmetHeaders(app);

  // Activation du view engine
  this.initViewEngine(app);

  // Activation du module de configuration des routes statiques
  this.initModulesClientRoutes(app);

  // Activation du module de configuration
  this.initModulesConfiguration(app);

  // Activation routes
  this.initModulesServerRoutes(app);

  // Activation du error handler
  this.initErrorRoutes(app);

  return app;
};
