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
    debug: process.env.MONGODB_DEBUG || false,
    msg: {
      global: {
        default: 'La validation du `{PATH}` a échoué pour la valeur `{VALUE}`',
        required: 'Le `{PATH}` est un champ obligatoire'
      },
      number: {
        min: 'La `{VALUE}` est inférieure à la valeur minimum requise `{MIN}`',
        max: 'La `{VALUE}` est supérieure à la valeur maximum requise `{MAX}`'
      },
      date: {
        min: 'Le `{PATH}` ({VALUE}) est inférieur à la date minimum requise ({MIN})',
        max: 'Le `{PATH}` ({VALUE}) est supérieur à la date maximum requise ({MAX})'
      },
      string: {
        enum: 'La valeur `{VALUE}` n\'est pas autorisée pour le champs `{PATH}`',
        match: 'La valeur `{VALUE}` est invalide pour le champs `{PATH}`',
        minlength: 'Champs `{PATH}`: la ({VALUE}) est inférieur au minimum requis ({MINLENGTH})',
        maxlength: 'Champs `{PATH}`: la ({VALUE}) est supérieur au maximum requis ({MAXLENGTH})'
      }
    }
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
      minOptionalTestsToPass: 2
    }
  },
  mailer: {
    from: process.env.MAILER_FROM || 'contact@bullesdesoi.fr',
    options: {
      host: process.env.MAILER_HOST || 'auth.smtp.1and1.fr',
      port: process.env.MAILER_PORT || '465',
      service: process.env.MAILER_SERVICE_PROVIDER || 'bullesdesoi',
      auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD
      },
      secure: process.env.MAILER_SECURE || true
    }
  }
};
