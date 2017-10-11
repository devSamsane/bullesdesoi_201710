// Déclaration des librairies nodeJS

// Déclaration des librairies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Déclaration des fichiers de configuration

/**
 * Paramétrage du schéma `Seance`
 */
const SeanceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  intention: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  rang: {
    type: Number,
    default: ''
  },
  updated: {
    type: Date
  },
  relaxations: [{
    type: Schema.Types.ObjectId,
    ref: 'Relaxation'
  }],
  sophronisations: [{
    type: Schema.Types.ObjectId,
    ref: 'Sophronisation'
  }]
});

/**
 * Initialisation du model
 * @name Seance
 */
mongoose.model('Seance', SeanceSchema);
