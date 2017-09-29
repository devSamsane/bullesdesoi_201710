// Déclaration des librairies nodeJS

// Déclaration des librairies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Déclaration des fichiers de configuration

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
    required: true
  },
  endDateTime: {
    type: Date,
    required: true
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
