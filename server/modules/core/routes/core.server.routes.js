// Déclaration des librairies nodeJS

// Déclaration des librairies
const express = require('express');

const router = express.Router();

// Déclaration des fichiers de configuration
const coreController = require('../controllers/core.server.controller');

module.exports = router => {
  router.get('/', coreController.coreTemplate);
};
