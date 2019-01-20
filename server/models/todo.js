var mongoose = require('mongoose');

var Todo = mongoose.model('Todo' , {
    text: {type: String, required: true, minlength: 1, trim: true},
    completed: {type: Boolean, default: false},
    completedAt: {type: Number, default: null}
});

// var anotherTodo = new Todo({
//     text: '   working with validation  2    '
// });

// anotherTodo.save().then((doc) => {
// console.log(`Saved todo : ${JSON.stringify(doc, undefined, 4)}`);
// }, (err) => {
// console.log(`Unable to save todo ${err}`);
// });

module.exports = {
    Todo
};