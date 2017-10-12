// déclaration des fichiers de configuration
const defaultEnvConfig = require('./default');

module.exports = {
  app: {
    title: `${defaultEnvConfig.app.title} - Environnement de developpement`
  },
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  domain: process.env.DOMAIN || 'http://localhost',
  livereload: true,
  db: {
    uri: process.env.MONGODB_URI || `mongodb://${process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost'}/bullesdesoi-dev`
  },
  seedDB: {
    seed: process.env.MONGO_SEED || 'active',
    options: {
      logResults: true,
      seedUser: {
        email: 'seeduser@localhost.com',
        firstname: 'seeduser',
        lastname: 'seeduserlastname',
        phoneNumber: '0660606060',
        provider: 'local',
        roles: ['user']
      },
      seedAdmin: {
        email: 'seedadmin@localhost.com',
        firstname: 'seedadmin',
        lastname: 'seedadminlastname',
        phoneNumber: '0660606061',
        provider: 'local',
        roles: ['user', 'admin']
      },
      seanceUser: {
        intention: 'intention du user',
        rang: '1'
      },
      sophroUser: {
        description: 'sophronisation de la seance 1',
        intention: 'intention de la sophronisation de la seance 1',
        type: 'présentation',
        name: 'nom de la sophronisation'
      },
      relaxationUser: {
        intitule: 'intitulé de la relaxation de la seance 1',
        intention: 'intention de la relaxation de la seance 1',
        consigne: 'consigne de la relaxation de la seance 1'
      }
    }
  },
  mailer: {
    active: false
  }
};
