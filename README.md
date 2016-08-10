#Express-App-API-TODO
### REST API

//WRITE YOUR OWN NOTES HERE

//What is Middlewear? How does it get used? How do I check it?
    Middlewear is the glue to all routes. It gets used on all of our routes. To check we can console log it and log it.

//How do I add custom middlewear to specific routes.

//Why do we move code and export it and require it?

module.exports = middlewear and we do this bc...

//What is requiring a module and then How do I mount it?
`npm install body-parser` and then I requred it at the top of my server.js file. And then I mounted it. When I mounted it, I did this... 
The reason I did that was because 

//Created 1st GET /todos & tested it with POSTMAN by creating Collection->Environmet->Route

//Created 2nd GET /todos/:id & tested it with POSTMAN & also pushed to HEROKU and created -Environment->Route

```javascript
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
```
The reason this is used is because when asked for the route it can give each id.

//Created POST //todos
First, had to initialize id. 
    `var todoNextId = 1;`
    And then we first had to require body.

//REFACTOR using UnderScore.JS
    //GET TODOS/:id Why & What did you do?
    Added var _ to bring in the underscore library and using the _where file to bring up the first listed value

```javascript
app.get('/todos/:id', function(req, res){
//creating a variable that will hold id from params object.
  var todoId = parseInt(req.params.id);
// _.findWhere finds
  var matchedTodo = _.findWhere(todos, {id: todoId});
    if(matchedTodo){
      res.json(matchedTodo)
    } else{
      res.status(404).send();
    }
})
```
    //POST TODOS Why and What is happening?

```javascript
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
```

_.pick copies the required objects. Anything else that gets added to the body will be rejected.


//Create DELETE /TODOS/:id (Why and What)
Returns a copy of the array with all instances of the values removed.

_.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
=> [2, 3, 4]

```javascript
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
```
Delete funtion will delete the inputed data. What the not matchedtodo takes the array information, if it is not the same length it will bring an error.
