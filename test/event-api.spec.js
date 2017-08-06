
let mongoose = require("mongoose");
let Event = require('../models/event-model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
/**
  * Before every test , clean the database
*/
describe('Event', () => {
    beforeEach((done) => {
        Event.remove({}, (err) => {
           done();
        });
    });
/*
  * GET, /event end point test
*/
  describe('/get event', () => {
      it('it should GET all the events', (done) => {
        chai.request(server)
            .get('/event')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
});

/*
  * POST, /event end point test
*/

  describe('/POST event', () => {
      it('it should not POST an Event without title field', (done) => {
        let event = {
            date: "2/12/2017",
            time: "12:00 AM",
            place: "london",
        }
            chai.request(server)
            .post('/event')
            .send(event)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('title');
                res.body.errors.title.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST an Event ', (done) => {
        let event = {
          date: new Date(),
          time: "12:00 AM",
          location: "london",
          title: ".NET",
        }
            chai.request(server)
            .post('/event')
            .send(event)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Event successfully added!');
                res.body.result.should.have.property('date');
                res.body.result.should.have.property('time');
                res.body.result.should.have.property('location');
                res.body.result.should.have.property('title');
              done();
            });
      });
  });

  /*
    * /event/:id end point test
  */

describe("/GET event by ID", () => {
  it("it should get an event by the given Id", (done) => {
    let newEvent =  new Event({
      date: "03/12/2017",
      time: "7:12 PM",
      location: "Piza",
      title: "Introduction to mongodb"
    });
    newEvent.save((err, event) => {
      chai.request(server)
      .get('/event/' + event.id)
      .send(event)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('date');
        res.body.should.have.property('time');
        res.body.should.have.property('location');
        res.body.should.have.property('title');
        res.body.should.have.property('_id').eql(event.id);
      done();
      });
    });
  });
});

/*
  * PUT, /event/:id end point test
*/

  describe('/PUT/:id Event', () => {
      it('it should UPDATE an Event given the id', (done) => {
        let newEvent = new Event({
          date: "9/12/2017",
          time: "15:00 PM",
          location: 'Manchester',
          title: "Python3"
        });
        newEvent.save((err, event) => {
          chai.request(server)
          .put('/event/' + event.id)
          .send({
            date: "9/12/2017",
            time: "15:00 PM",
            location: 'Manchester',
            title: "ES6"
          })
          .end((err, res) => {
              res.should.have.status(200);
              res.body.result.should.be.a('object');
              res.body.should.have.property('message').eql('Event updated!');
              res.body.result.should.have.property('title').eql('ES6');
            done();
          });
          });
      });
  });

  /*
    * DELET, /event/:id end point test
  */

  describe('/DELETE/:id Event', () => {
        it('it should DELETE an Event given the id', (done) => {
          let newEvent = new Event({
            date: "9/12/2017",
            time: "15:00 PM",
            location: 'Manchester',
            title: "Python3"
          })
          newEvent.save((err, event) => {
                  chai.request(server)
                  .delete('/event/' + event.id)
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('Object');
                      res.body.should.have.property('message').eql('Event successfully deleted!');
                      res.body.result.should.have.property('ok').eql(1);
                      res.body.result.should.have.property('n').eql(1);
                    done();
                  });
            });
        });
    });
