const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// create a Event schema
const EventSchema = new Schema({
    date: String,
    time: String,
    location: String,
    title: String
});
// Create Event Model
const EventModel = mongoose.model('Event', EventSchema);
module.exports = EventModel;
