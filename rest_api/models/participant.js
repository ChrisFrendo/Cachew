const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create participant Schema & model
const ParticipantSchema = new Schema({
  
});

const Participant = mongoose.model('participant', ParticipantSchema);

module.exports = Participant;
