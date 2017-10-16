var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog_demo', {useMongoClient: true});

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model('User', userSchema);

var Post = mongoose.model('Post', postSchema);

// var newUser = new User({
//     email: 'hermione@hogwarts.edu',
//     name: 'Hermione Granger'
// });

// newUser.posts.push({
//     title: 'How to brew polyjuice potion',
//     content: 'GO TO POTIONS CLASS'
// });

// newUser.save(function(err, user){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });

User.findOne({name: 'Hermione Granger'}, function(err, user){
   if(!err){
       user.posts.push({
           title: "3 Things I Hate",
           content: 'Voldemort, Malfoy, Trelawny'
       });
       user.save(function(err, user2){
           if(!err){
               console.log(user2);
           }
       });
   } 
});