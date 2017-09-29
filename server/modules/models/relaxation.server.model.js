// Déclaration des librairies nodeJS

// Déclaration des librairies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Déclaration des fichiers de configuration

/**
 * Paramétrage du schéma `Relaxation`
 */
const RelaxationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  seance: {
    type: Schema.Types.ObjectId,
    ref: 'Seance'
  },
  intitule: {
    type: String,
    required: true
  },
  intention: {
    type: String,
    required: true
  },
  consigne: {
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
 * @name Relaxation
 */
mongoose.model('Relaxation', RelaxationSchema);
