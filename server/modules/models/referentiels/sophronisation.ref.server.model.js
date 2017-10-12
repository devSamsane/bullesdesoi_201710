// Déclaration des librairies nodeJS

// Déclaration des librairies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Déclaration des fichiers de configuration
const config = require('../../../lib/config/index');

/**
 * Paramétrage du schema `RefSophronisationSchema`
 */
const RefSophronisationSchema = new Schema({
  name: {
    type: String,
    required: [true, config.db.msg.global.required]
  },
  description: {
    type: String,
    required: [true, config.db.msg.global.required]
  }
});

/**
 * Création du model `RefSophronisation`
 */
mongoose.model('RefSophronisation', RefSophronisationSchema);
