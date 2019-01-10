//npm install mongodb@2.2.19 --save ( important, tried the lates but it would not work with this course)

//ES6 object destructuring, following two lines of code do the same thing.
//const MongoClient = require('mongodb').MongoClient;
//const {MongoClient} = require('mongodb');
//how to get out additional things
const {MongoClient, ObjectID} = require('mongodb');
//how to generate our own unique id 
var obj = new ObjectID();
console.log(obj);
console.log(obj.getTimestamp());

//you can connect to a database that does not yet exist. It will not get created unlsess you write data to it.
const databaseURL = 'mongodb://localhost:27017/ToDoApp';

MongoClient.connect(databaseURL , (error, db) => {
    if(error) {
        return console.log('Cannot connect to the MongoDB database server :(');
    }
    console.log('Connected to the MongoDB database server :) !');

    // db.collection('ToDo').insertOne({
    //     text: 'Start a new task',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to complete the insert into ToDo.', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // insert a new document in the Users collection (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Jeff',
    //     age: 53,
    //     location: 'Surrey BC'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to complete the insert into Users.', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });    

    db.close();
});


//ES6 object destructuring
var user = {name: 'jeff', age:53};
//get the name property from object user
var {name} = user;
console.log(name);