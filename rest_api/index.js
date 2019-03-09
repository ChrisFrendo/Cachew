const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// set up express app
const app = express();
app.use(cors());
// connect to mongodb
mongoose.connect('mongodb://localhost/cachew', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function (err, req, res, next) {
    console.log(err.name);
    console.log(err.message);
    if (err.name == ("ValidationError")) {
        res.status(422).send({
          error: err.name,
          description: 'Invalid data entered',
          err_message: err.message
        });
    } else {
        // console.log(err.message);
        res.status(420).send({
          error: err.name,
          description: 'username already exists',
          err_message: err.message
        });
    }
});

// listen for request
app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests');
});
