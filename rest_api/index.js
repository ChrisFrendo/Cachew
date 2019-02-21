const express = require('express');

//set up express ap
const app = express();

app.get('/', function(req, res){
  console.log('GET request');
  res.send({name: 'Student Name'});
});

//listen for requests
app.listen(4000, function(){
console.log('now listening for requests');
});
