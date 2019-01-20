var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {type: String, required: true, minlength: 1, trim: true}
});

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