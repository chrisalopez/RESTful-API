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
    //POST TODOS 
