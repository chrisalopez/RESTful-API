var express = require('express')

var app = express() //creating an express app
var path = require('path');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;
var middlewear = require('./middlewear')

var todos = [
  {
    id: 1,
    description: 'Teach REST API',
    completed: false
  },
  {
    id: 2,
    description: 'Go eat a healthy lunch.',
    completed: true
  }
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


app.get('/todos/:id', function(req, res){ //creating a variable that will hold id from params object.
  var todoId = parseInt(req.params.id);
  var matchedTodo;
  todos.forEach(function(todo){
    if(todoId === todo.id){
      matchedTodo = todo;
    }
  })
    if(matchedTodo){
      res.json(matchedTodo)
    } else{
      res.status(404).send();
    }
})


app.post('/todos', function(req, res){
  var body = req.body;
  // CHALLENGE
    // add id field
    body.id = todoNextId;
    todoNextId++;
    // push body into array
    // we justed parsed bofy with id and now we want to persist that to temporary db
    todos.push(body)
  res.json(body)
})



app.get('/about', middlewear.logger, function(req, res){
  res.send('<h1> Express About Page</h1>')
})

app.listen(PORT, function(){
  console.log('Listening on PORT ' + PORT)
})
