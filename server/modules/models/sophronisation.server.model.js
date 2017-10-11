// Déclaration des librairies nodeJS
const path = require('path');

// Déclaration des librairies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Déclaration des fichiers de configuration
const config = require(path.resolve('./server/lib/config/index'));

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
    required: [true, config.db.msg.global.required]
  },
  intention: {
    type: String,
    required: [true, config.db.msg.global.required]
  },
  type: {
    type: [{
      type: String,
      enum: ['présentation', 'futurisation', 'prétérisation', 'totalisation']
    }],
    required: [true, config.db.msg.global.required]
  },
  name: {
    type: String,
    required: [true, config.db.msg.global.required]
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
