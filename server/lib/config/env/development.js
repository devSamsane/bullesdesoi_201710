// déclaration des fichiers de configuration
const defaultEnvConfig = require('./default');

module.exports = {
  app: {
    title: `${defaultEnvConfig.app.title} - Environnement de developpement`
  },
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  domain: process.env.DOMAIN || 'http://localhost',
  livereload: true
};
