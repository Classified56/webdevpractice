var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user'),
    methodOverride = require('method-override'),
//    seedDB = require("./seeds");
    flash = require('connect-flash');
    
var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index');

//allows the public directory to be readily accessible to rendering files
app.use(express.static(__dirname + '/public'));
//sets the default for rendering to be ejs files, so it doesn't have to be written every time
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
//A line to allow data to be easily taken from input flow
app.use(bodyParser.urlencoded({extended:true}));
//connecting the MongoDB to the app
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});

//seedDB();

app.use(flash());
app.use(require('express-session')({
    secret: 'The best Doctor in the new series has to be Matt Smith',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//allows each route to check if a user is logged in
app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comment',commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp server has spun up.');
});