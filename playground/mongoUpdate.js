const {MongoClient, ObjectID} = require('mongodb');
const databaseURL = 'mongodb://localhost:27017/ToDoApp';

MongoClient.connect(databaseURL , (error, db) => {
    if(error) {
        return console.log('Cannot connect to the MongoDB database server :(');
    }
    console.log('Connected to the MongoDB database server :) !');

    // db.collection('ToDo').findOneAndUpdate({
    //     _id: new ObjectID('5c3aa31516e6edd2fc13327c')
    // },{
    //     $set : {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });
    //_id: new ObjectID('5c3aa31516e6edd2fc13327c')
    db.collection('Users').findOneAndUpdate(
        {_id: new ObjectID('5c32e99196d7c125b8baad25')},
        { 
            $set : {name: 'Jeff Lanoue' },
            $inc: { age: 1}
        },
       { returnOriginal: false }
    ).then((result) => {
        console.log(result);
    });
       

    //db.close();
});

