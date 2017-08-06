`use struct`
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let config = require('./config/config');
let EventModel = require('./controler/models/event-model');

/**
  * DB connection
  */
mongoose.connect(config.db)
mongoose.connection.on('connected',() => {
  console.log('Mongoose default connection open to ' + config.db);
});

/**
  * Parse application/json and look for raw text
  */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

/**
  * Root end Point
  */

app.get("/", (req, res) =>
  res.json({message: "Welcome to our Event Page!"}));

/**
  * Get all Event end Point
  */

app.get("/event", (req, res) => {
  //Query the DB and if no errors, send all the event
  let query = EventModel.find({});
  query.exec((err, result) => {
      if(err) res.send(err);
      //If no errors, send them back to the client
      res.json(result);
  });
});

/**
  * Post an Event end Point
  */
app.post("/event", (req, res) => {
  //Creates a new Event
  var newEvent = new EventModel(req.body);
  //Save it into the DB.
  newEvent.save((err, result) => {
      if(err) {
          res.send(err);
      }
      else {
        //If no errors, send it back to the client
        res.json({message: "Event successfully added!", result });
      }
  });
});

/**
  * Get an Event using ID end Point
  */

app.get("/event/:id", (req, res) => {
  EventModel.findById(req.params.id, (err, result) => {
      if(err) res.send(err);
      //If no errors, send it back to the client
      res.json(result);
  });
});

/**
  * Delete an Event using ID end Point
  */

app.delete("/event/:id", (req, res) => {
  EventModel.remove({_id : req.params.id}, (err, result) => {
      res.json({ message: "Event successfully deleted!", result });
  });
});

/**
  * Update an Event using ID end Point
  */

app.put("/event/:id", (req, res) => {
  EventModel.findById({_id: req.params.id}, (err, result) => {
      if(err) res.send(err);
      Object.assign(result, req.body).save((err, result) => {
          if(err) res.send(err);
          res.json({ message: 'Event updated!', result });
      });
  });
});

app.listen(config.port);
console.log("Listening on port " + config.port);

module.exports = app;
