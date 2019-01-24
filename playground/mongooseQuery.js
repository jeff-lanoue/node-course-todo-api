const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

var id = '5c46a0d1d8241c4594448a9a'; // from Todo 
var userID = '5c439e35bca1502658bdc2aa';

// if (! ObjectID.isValid(id)) {
//     console.log('That ID is not even valid !');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos : ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo : ', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(! todo) {
//         return console.log('That ID was not found.');
//     }
//     console.log('Todo by ID: ', todo);
// }).catch((e) => console.log(e));

User.findById(userID).then((user) => {
    if(! user) {
        return console.log('That User ID was not found.');
    }
    console.log('User by ID: ', JSON.stringify(user, undefined, 4));
}).catch((e) => console.log(e));