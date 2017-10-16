var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog_demo_2', {useMongoClient: true});

var Post = require('./models/post');
var User = require('./models/user')

//CREATING A POST AND REFERENCING IT INSIDE OF THE USER OBJECT
Post.create({
    title: 'How to grill a burger Part 4',
    content: 'asdfasdfasdfjlkjkljkl;j;ljklj'
}, function(err, post){
    if(!err){
        User.findOne({email: 'bob@gmail.com'}, function(err, foundUser){
            if(!err){
                foundUser.posts.push(post);
                foundUser.save(function(err, data){
                    if(!err){
                        console.log(data);
                    }
                });
            }
        })
    }
});

//FINDING ALL THE POSTS UNDER THAT USER AND PULLING THE ASSOCIATED DATA TOGETHER
User.findOne({email: 'bob@gmail.com'}).populate('posts').exec(function(err, user){
   if(!err){
       console.log(user);
   }
});

