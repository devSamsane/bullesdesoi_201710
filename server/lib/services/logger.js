// Déclaration nodeJS
const fs = require('fs');

// Déclaration des librairies
const _ = require('lodash');
const winston = require('winston');
const winstonExpress = require('express-winston');

// Déclaration des fichiers de configuration
const config = require('../config/index');

let logger;
let loggerExpress;

class Logger {

  /**
   * Instanciation du logger
   * @static log
   * @returns
   */
  static log () {
    if (logger) {
      return logger;
    }

    // Instantiation de winston par défaut avec `console transport`
    logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: 'info',
          colorize: true,
          showLevel: true,
          handleExceptions: true,
          humanReadableUnhandledException: true
        })
      ],
      exitOnError: false
    });

    // Instantiation du fichier Winston Transport
    const fileLoggerTransport = this.setupFileLogger();
    fileLoggerTransport && logger.add(winston.transports.File, fileLoggerTransport);

    return logger;
  }

  /**
   * Passage des options à utiliser avec winston
   * Retourne un objet winston avec les options et paramètres
   * @static setupFileLogger
   * @returns
   */
  static setupFileLogger () {
    const _config = _.clone(config, true);
    const configFileLogger = _config.log.fileLogger;

    if (!_.has(_config, 'log.fileLogger.directoryPath') || !_.has(_config, 'log.fileLogger.fileName')) {
      console.warn('Fichier de configuration du logger introuvable');
      return false;
    }

    const logPath = `${configFileLogger.directoryPath}/${configFileLogger.fileName}`;
    // Instantiation du fichier de log
    if (!fs.openSync(logPath, 'a+')) {
      throw new Error('Impossible d\'instancier le fichier de log');
    }

    return {
      level: 'debug',
      colorize: false,
      fileName: logPath,
      timestamp: true,
      maxsize: configFileLogger.maxsize ? configFileLogger.maxsize : 10485760,
      maxFiles: configFileLogger.maxFiles ? configFileLogger.maxFiles : 2,
      json: (_.has(configFileLogger, 'json')) ? configFileLogger.json : false,
      eol: '/n',
      tailable: true,
      showLevel: true,
      humanReadableUnhandledException: true
    };
  }

  /**
   * Définition du logger ExpressJS
   * @static logExpress
   * @returns
   */
  static logExpress () {
    if (loggerExpress) {
      return loggerExpress;
    }

    loggerExpress = winstonExpress.logger({
      transports: [
        new winston.transports.Console({
          level: 'info',
          json: false,
          colorize: true
        })
      ],
      meta: true,
      expressFormat: true,
      colorize: true
    });

    return loggerExpress;
  }

}

// Export de la class Logger
module.exports = Logger;
