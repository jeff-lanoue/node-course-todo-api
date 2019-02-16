var en = require('./config/config');

console.log(process.env.MONGODB_URI);

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT;

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
            return res.sendStatus(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });        

});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(! ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(! todo) {
            return res.sendStatus(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id' , (req, res) => {
    var id = req.params.id;
    //get a subset of what is in the body
    var body = _.pick(req.body, ['text', 'completed']);

    if(! ObjectID.isValid(id)) {
        return res.sendStatus(404).send();
    }

    //update body property
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(400).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();        
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);
        //tokens:[req.body.access, req.body.token]
    
    user.save().then((user) => {
        res.send(user);
    }, (e) => {
        res.status(400).send(e);
    });    

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = {app};