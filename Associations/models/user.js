var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    //referencing the posts instead of embedding it
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

module.exports = mongoose.model('User', userSchema);