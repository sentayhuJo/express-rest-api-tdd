let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Event schema definition
let EventSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    time: { type: String, required: true },
    locaiton: { type: String, required: true },
    title: { type: String, required: true },
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
EventSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the EventSchema for use elsewhere.
module.exports = mongoose.model('event', EventSchema);
