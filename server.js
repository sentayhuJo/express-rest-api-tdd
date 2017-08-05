`use struct`
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let eventRoute = require('./controler/routes/event-route');
let config = require('./config/config'); //we load the db location from the JSON files
let EventModel = require('./controler/models/event-model');
//db connection
mongoose.connect(config.db)
mongoose.connection.on('connected',() => {
  console.log('Mongoose default connection open to ' + config.db);
});

//parse application/json and look for raw text
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) =>
  res.json({message: "Welcome to our Event Page!"}));
app.get("/event", (req, res) => {
  //Query the DB and if no errors, send all the event
  let query = EventModel.find({});
  query.exec((err, result) => {
      if(err) res.send(err);
      //If no errors, send them back to the client
      res.json(result);
  });
});
app.post("/event", (req, res) => {
  //Creates a new Event
  var newEvent = new EventModel(req.body);
  //Save it into the DB.
  newEvent.save((err, result) => {
      if(err) {
          res.send(err);
      }
      else { //If no errors, send it back to the client
          res.json({message: "Event successfully added!", result });
      }
  });
});
app.route("/event/:id")
    .get(eventRoute.getEvent)
    .delete(eventRoute.deleteEvent)
    .put(eventRoute.updateEvent);

app.listen(config.port);
console.log("Listening on port " + config.port);

module.exports = app; // for testing
