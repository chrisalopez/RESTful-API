var express = require('express')

var app = express() //creating an express app
var path = require('path');
var bodyParser = require('body-parser');
var _ = require('underscore');

var PORT = process.env.PORT || 3000;
var middlewear = require('./middlewear')

var todos = [
  // {
  //   id: 1,
  //   description: 'Teach REST API',
  //   completed: false
  // },
  // {
  //   id: 2,
  //   description: 'Go eat a healthy lunch.',
  //   completed: true
  // }
]

var todoNextId = 1;

app.use(middlewear.requireAuthentication); // This MiddleWear is for the whole app!

app.use(bodyParser()); //Why did we do this and what does this mean?

app.get('/', function(req, res){
  res.send('<h1>Express Todo API </h1>')
})



app.get('/todos', function(req, res){
  res.json(todos);
})

app.get('/todos/:id', function(req, res){
//creating a variable that will hold id from params object.
  var todoId = parseInt(req.params.id);
// _.findWhere finds the first value that matches all of the key-value pairs
  var matchedTodo = _.findWhere(todos, {id: todoId});
    if(matchedTodo){
      res.json(matchedTodo)
    } else{
      res.status(404).send();
    }
})

app.post('/todos', function(req, res){
  var body = _.pick(req.body, 'description', 'completed');
//_.isBooleand

    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
      return res.status(400).send();
    }
    body.description = body.description.trim();

    body.id = todoNextId;
    todoNextId++;

    todos.push(body)
  res.json(body)
})

app.delete('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id);
  var matchedTodo = _.findWhere(todos, {id: todoId});
    //if reverse, no marchedTodo id.
  if(!matchedTodo){
    res.status(404).json({"eror": "No Todo Found."})
  } else {
    todos = _.without(todos, matchedTodo );
  }
  res.json(matchedTodo);
})


app.get('/about', middlewear.logger, function(req, res){
  res.send('<h1> Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log('Listening on PORT ' + PORT)
})
