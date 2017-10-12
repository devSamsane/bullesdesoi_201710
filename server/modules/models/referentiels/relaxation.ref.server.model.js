// Déclaration des librairies nodeJS

// Déclaration des librairies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Déclaration des fichiers de configuration
const config = require('../../../lib/config/index');

/**
 * Paramétrage du schema `RefRelaxationSchema`
 */
const RefRelaxationSchema = new Schema({
  intention: {
    type: String,
    required: [true, config.db.msg.global.required]
  },
  consigne: {
    type: String,
    required: [true, config.db.msg.global.required]
  }
});

/**
 * Création du model `RefRelaxation`
 * @name RefRelaxation
 */
mongoose.model('RefRelaxation', RefRelaxationSchema);
