
let mongoose = require("mongoose");
let Event = require('../controler/models/event-model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Event', () => {
    beforeEach((done) => { //Before each test we empty the database
        Event.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
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
          date: "2/12/2017",
          time: "12:00 AM",
          location: "london",
          title: ".NET",
        }
            chai.request(server)
            .post('/event')
            .send(event)
            .end((err, res) => {
              console.log(res.body);
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

describe("/GET event by ID", () => {
  it("it should get an event by the given Id", (done) => {
    let Event =  new Event({
      date: "3/12/2017",
      time: "7:12 PM",
      location: "Piza",
      title: "Introduction to mongodb"
    });
    Event.save((err, result) => {
      chai.request(server)
      .get('/event/' + result.id)
      .send(result)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a(Object);
        res.body.should.have.property('date');
        res.body.should.have.property('time');
        res.body.should.have.property('location');
        res.body.should.have.property('title');
        res.body.should.have.property('_id').eql(result.id);
      done();
      });
    });
  });
});
