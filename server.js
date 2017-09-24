// déclaration des librairies
const chalk = require('chalk');

// déclaration des fichiers de configuration
const app = require('./server/lib/app');

app.start()
  .catch((error) => {
    console.log(chalk.red('Echec du démarrage: ' + error.message));
    throw(error);
  });
