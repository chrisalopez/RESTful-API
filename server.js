var express = require('express')

var app = express() //creating an express app
var path = require('path');
var PORT = 3000;

// CUSTOM MIDDLEWEAR
var middlewear = {
  requireAuthentication: function(req, res, next){
    console.log('Request Auth Ran.');
    next();
  },
  logger: function(req, res, next){
    console.log(req.method + req.originalUrl + new Date().toString());
    next();
  }
}


app.use(middlewear.requireAuthentication); // This MiddleWear is for the whole app!

app.get('/', function(req, res){
  res.send('<h1>Express Todo API </h1>')
})

app.get('/about', middlewear.logger, function(req, res){
  res.send('<h1> Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log('Listening on PORT ' + PORT)
})
