//npm i mongoose

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ToDoApp', { useNewUrlParser: true });

var Todo = mongoose.model('Todo' , {
    text: {type: String},
    completed: {type: Boolean},
    completedAt: {type: Number}
});


var newTodo = new Todo({
    text: 'Do cardio workout'
});

newTodo.save().then((doc) => {
    console.log(`Saved todo : ${doc}`);
}, (err) => {
    console.log(`Unable to save todo ${err}`);
});


var anotherTodo = new Todo({
    text: 'Add an alternate todo',
    completed: true,
    completedAt: 548878554
});

anotherTodo.save().then((doc) => {
   console.log(`Saved todo : ${JSON.stringify(doc, undefined, 4)}`);
}, (err) => {
   console.log(`Unable to save todo ${err}`);
});
