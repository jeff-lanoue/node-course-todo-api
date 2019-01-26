//npm i express body-parser --save
var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();

//config middleware 
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
       res.send({todos});
   }, (e) => {
        res.status(400).send(e);
   }); 
});

//GET /todos/122154
var id = '5c46a0d1d8241c4594448a9a'; // from Todo 

app.get('/todos/:id' , (req, res) => {
    var id = req.params.id;

    if (! ObjectID.isValid(id)) {
        return res.status(404).send();
    }    
    Todo.findById(id).then((todo) => {
        if(! todo) {
            res.send(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });        

});

app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});

module.exports = {app};