// déclaration des librairies
const chalk = require('chalk');
const express = require('express');

// déclaration des fichiers de configuration
const app = express();

app.get('/', function(req, res) {
  res.send('Hello bullesdesoi')
})

app.listen(3000, function () {
  console.log(chalk.red('Application fonctionne sur le port 3000'))
})