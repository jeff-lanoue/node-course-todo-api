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

//    db.collection('ToDo').find({completed: false}).toArray().then((docs) => {
    // db.collection('ToDo').find({
    //     _id: new ObjectID('5c36c78816e6edd2fc131484')
    //     }).toArray().then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos : ', err);
    // });

    // db.collection('ToDo').find().count().then((count) => {
    //     console.log(`Todos : ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos : ', err);
    // });

    db.collection('ToDo').find({Text: 'Beat the dog'}).toArray().then((docs) => {
            console.log('Users');
            console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos : ', err);
    });
    db.close();
});


//ES6 object destructuring
var user = {name: 'Kim', age:53};
//get the name property from object user
var {name} = user;
console.log(name);

