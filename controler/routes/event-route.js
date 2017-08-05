let mongoose = require('mongoose');
let EventModel = require('../models/event-model');

/*
 * GET /Event route to retrieve all the Event.
 */
function getEvent(req, res) {
    //Query the DB and if no errors, send all the event
    let query = EventModel.find({});
    query.exec((err, result) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(result);
    });
    res.json({msg: 'hello'});
}

/*
 * POST /Event to save a new Event.
 */
function postEvent(req, res) {
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
}

/*
 * GET /Event/:id route to retrieve an Event given its id.
 */
function getEvent(req, res) {
    EventModel.findById(req.params.id, (err, result) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(result);
    });
}

/*
 * DELETE /Event/:id to delete an Event given its id.
 */
function deleteEvent(req, res) {
    EventModel.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Event successfully deleted!", result });
    });
}

/*
 * PUT /Event/:id to updatea an Event given its id
 */
function updateEvent(req, res) {
    EventModel.findById({_id: req.params.id}, (err, result) => {
        if(err) res.send(err);
        Object.assign(result, req.body).save((err, result) => {
            if(err) res.send(err);
            res.json({ message: 'Event updated!', result });
        });
    });
}

//export all the functions
module.exports = {
  getEvent,
  postEvent,
  getEvent,
  deleteEvent,
  updateEvent
};
