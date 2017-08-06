
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Event schema definition
const EventSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    time: { type: String },
    location: { type: String },
    title: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

// Exports the EventSchema for use elsewhere.
module.exports = mongoose.model('event', EventSchema);
