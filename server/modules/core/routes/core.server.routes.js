// Déclaration des librairies nodeJS
const path = require('path');

// Déclaration des librairies
const express = require('express');

const router = express.Router();

// Déclaration des fichiers de configuration
const coreController = require(path.resolve('./server/modules/core/controllers/core.server.controller'));

module.exports = router => {
  router.get('/', coreController.coreTemplate);
};
