var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/drink_app', {useMongoClient: true});


var drinkSchema = new mongoose.Schema({
    name: String, 
    content: Number,
    price: Number
});

var Drink = mongoose.model('Drink', drinkSchema);

// var vodka = new Drink({
//     name: 'Vodka',
//     content: 50,
//     price: 28.99
// });

// vodka.save(function(err, drink){
//   if(err){
//       console.log('something went wrong');
//   } else {
//       console.log('Drink saved');
//       console.log(drink);
//   }
// });

Drink.create({
    name: 'Water',
    content: 0
}, function(err, drink){
    if(err){
        console.log(err);
    } else {
        console.log(drink);
    }
});

Drink.find({}, function(err, drinks){
   if(err){
       console.log('Oh no, error');
       console.log(err);
   } else{
       console.log('All the Drinks...')
       console.log(drinks);
   }
});


//If you leave it running then Cloud 9 could timeout and cause mongo to crash. If this happens, try the following steps to repair it. 

// From the command line, run:

// cd ~
// ./mongod --repair
// If you're still having trouble getting it to run then find the /data directory (it should be inside of ~ or ~/workspace) and cd into it. Once inside, run rm mongod.lock then cd back into ~ and run ./mongod again (see below).

// cd ~/data
// rm mongod.lock
// cd
// ./mongod