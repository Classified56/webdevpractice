var express = require('express');
var app = express();
var request = require ('request');

//allows the public directory to be readily accessible to rendering files
app.use(express.static('public'));
//sets the default for rendering to be ejs files, so it doesn't have to be written every time
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('search');
});

app.get('/results', function(req, res){
    var search = req.query.search;
    console.log(search);
    var url = 'https://omdbapi.com/?s='+ search + '&apikey=thewdb';
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
           var data = JSON.parse(body); 
           res.render('home', {data: data});
        }
        else{
            res.send('404 Error');
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has spun up.');
});