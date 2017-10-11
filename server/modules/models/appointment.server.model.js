// Déclaration des librairies nodeJS
const path = require('path');

// Déclaration des librairies
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Déclaration des fichiers de configuration
const config = require(path.resolve('./server/lib/config/index'));

/**
 * Paramétrage du schéma `Appointment`
 */
const AppointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  startDateTime: {
    type: Date,
    required: [true, config.db.msg.global.required]
  },
  endDateTime: {
    type: Date,
    required: [true, config.db.msg.global.required]
  },
  isConfirmed: {
    type: Boolean,
    default: false
  }
});

/**
 * Initialisation du model
 * @name Appointment
 */
mongoose.model('Appointment', AppointmentSchema);
