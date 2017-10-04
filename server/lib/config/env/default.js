module.exports = {
  app: {
    title: 'Bulles de Soi',
    description: 'Site web de sophrologie et prise de rendez-vous en ligne',
    keywords: 'sophrologie, relaxation, gestion du stress, perinatalité, enfance, adolescence'
  },
  log: {
    // format: process.env.LOG_DIR_PATH || 'dev',
    fileLogger: {
      directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
      fileName: process.env.LOG_FILE || 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false
    }
  },
  db: {
    promise: global.Promise,
    options: {
      // Paramètres nécessaires pour activer l'auth par certificat sous mongodb
      // ssl: true,
      // sslValidate: false,
      // checkServerIdentity: false,
      // sslCA: fs.readFileSync('../sslcerts/ssl-ca.pem'),
      // sslCert: fs.readFileSync('../sslcerts/ssl-cert.pem'),
      // sslKey: fs.readFileSync('../sslcerts/ssl-key.pem'),
      // sslPass: 'Q0J%6Luc~<4|)73'
    },
    // Activation du mode debug
    debug: process.env.MONGODB_DEBUG || false
  },
  csrf: {
    csrf: false,
    csp: false,
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    xssProtection: true
  },
  shared: {
    owasp: {
      allowPassphrases: false,
      maxLength: 16,
      minLength: 8,
      minPhraseLength: 20,
      minOptionalTestsToPass: 4
    }
  }
};
