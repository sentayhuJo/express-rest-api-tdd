
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./app/config/config');

//Connecting MongoDB using mongoose to the application
mongoose.connect(config.db);

//This callback will be triggered once the connection is successfully established to MongoDB
mongoose.connection.on('connected',() => {
  console.log('Mongoose default connection open to ' + config.db);
});

app.get('/', (req, res) => {
  res.send('hello');
})

//Express application will listen to port mentioned in the configuration
app.listen(config.port,err => {
  if(err) throw err;
  console.log("App listening on port " + config.port);
});
