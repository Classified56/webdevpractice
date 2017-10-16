var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    methodOverride = require('method-override'),
    sanitizer = require('express-sanitizer'),
    app = express();
    
//Set up and connection of everything
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restful_blog", {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(sanitizer());

//Blog Schema for Database
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    //default sets the piece if none is specified
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);

//Routes
app.get('/', function(req, res){
   res.redirect('/blogs'); 
});
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log('Error!');
        } else {
            res.render('index', {blogs: blogs});
        }
    })
});
app.get('/blogs/new', function(req, res){
   res.render('new'); 
});
app.post('/blogs', function(req, res){
    //sanitize the input
    req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, blog){
       if(err){
           res.render('new');
       } else {
           res.redirect('/blogs');
       }
   }); 
});
app.get('/blogs/:id', function(req, res){
    Blog.findById(req.params.id, function(err, found){
       if(err){
           res.redirect('/blogs');
       } else {
           res.render('show', {blog: found});
       }
    });
});
//EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, found){
       if(err){
           res.redirect('/blogs');
       } else {
            res.render('edit', {blog: found});
       }
    });
});
//UPDATE ROUTE
app.put('/blogs/:id', function(req, res){
    //sanitize the input
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);
        }
        
    });
});
//DESTROY!!!! ROUTE
app.delete('/blogs/:id', function(req, res){
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect('/blogs/'+req.params.id);
       } else {
           res.redirect('/blogs');
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log('REST blog has started');
});