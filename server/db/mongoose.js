//npm i mongoose

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);//this stops some deprication warnings ???
mongoose.set('useCreateIndex', true);//this stops some deprication warnings ???
mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ToDoApp', { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
module.exports = {
    mongoose
};