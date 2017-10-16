var express = require('express');
var app = express();

//allows the public directory to be readily accessible to rendering files
app.use(express.static('public'));
//sets the default for rendering to be ejs files, so it doesn't have to be written every time
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render('home');
});

app.get('/posts', function(req, res) {
    var posts = [
        {title:'FIRST', author: 'Anonymous'},
        {title:'Stuff', author: 'A Dude'},
        {title:'Butt', author: 'A silly person'}
    ]
    res.render('posts', {posts: posts})
});

app.get('/love/:thing', function(req, res){
    var thing = req.params.thing;
    //In order to send params or content to an ejs file, an object must be created with the variable and name
    res.render('love', {thingVar: thing});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has spun up.');
});