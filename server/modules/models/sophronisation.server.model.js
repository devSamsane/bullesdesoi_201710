// Déclaration des librairies nodeJS

// Déclaration des librairies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Déclaration des fichiers de configuration

/**
 * Paramétrage du schéma `Sophronisation`
 */
const SophronisationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  seance: {
    type: Schema.Types.ObjectId,
    ref: 'Seance'
  },
  description: {
    type: String,
    required: true
  },
  intention: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

/**
 * Initialisation du model
 * @name Sophronisation
 */
mongoose.model('Sophronisation', SophronisationSchema);
