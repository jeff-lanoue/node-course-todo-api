const {MongoClient, ObjectID} = require('mongodb');
const databaseURL = 'mongodb://localhost:27017/ToDoApp';

MongoClient.connect(databaseURL , (error, db) => {
    if(error) {
        return console.log('Cannot connect to the MongoDB database server :(');
    }
    console.log('Connected to the MongoDB database server :) !');

    //deleteMany
    
     db.collection('Users').deleteMany({name : "Jeff"}).then((result) => {
        console.log(result); 
     });
    //deleteOne
    // db.collection('ToDo').deleteOne({text: 'Beat the dog'}).then((result) => {
    //     console.log(result); 
    // });
    //findOneAndDelete
    // db.collection('Users').findOneAndDelete({_id: new ObjectID('5c3433db50136e6a5ced8be0')}).then((result) => {
    //     console.log(result); 
    // });

    //db.close();
});

