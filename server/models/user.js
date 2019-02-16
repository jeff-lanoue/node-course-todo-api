const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
    email: {type: String, required: true, minlength: 1, trim: true, unique: true, 
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email.`
        }
    },
    password:{type: String, required: true, minlength: 6},
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// must run follwoing command after droping all documents
//db.users.createIndex({email: 1}, {unique: true})

// var aUser = new User({
//     email: 'jeff.lanoue.1@gmail.com  '
// });

// aUser.save().then((doc) => {
//     console.log(`Saved a user : ${doc}`);
// }, (err) => {
//     console.log(`Unable to save the user : ${err}`);
// });

module.exports = {
    User
};