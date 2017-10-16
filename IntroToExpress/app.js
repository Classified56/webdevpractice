var express = require("express");
var app = express();

app.get('/', function(req, res){
    res.send("Welcome to the homepage. Please visit one of our /speak/:animals in the subpages or repeat/:word/:times");
});

app.get('/speak/:animal', function(req, res){
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: 'oink',
        dog: 'bark bark',
        mouse: 'squeek squeek',
        cow: 'moo'
    }
    var str = 'The ' + animal + ' goes ' + sounds[animal];
    console.log('The animal was ' + animal);
    res.send(str);
});

app.get('/repeat/:word/:num', function(req, res){
    console.log('repeating words again');
    var str = '';
    for(var i = 0; i < parseInt(req.params.num); i++){
        str += req.params.word + ' ';
    }
    res.send(str);
});

app.get('*', function(req, res){
    console.log('someone failed');
    res.send('You failed to copy down the correct route. \n What are you doing with your life anyways?? Please go back to the root page'); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The server has started');
});