var express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    //index.js is automatically required when you require a directory and not a file
    middleWare =  require('../middleware');

router.get('/', function(req, res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function(err, dbCampgrounds){
           if(err){
               console.log(err);
           } else {
               res.render('campgrounds/index', {campgrounds:dbCampgrounds});
           }
        });
    } else {
        //Get all campgrounds from DB
        Campground.find({}, function(err, dbCampgrounds){
           if(err){
               console.log(err);
           } else {
               res.render('campgrounds/index', {campgrounds:dbCampgrounds});
           }
        });
    }
});

//You can have the same name for a post and get route
router.post('/', middleWare.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image= req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
            id: req.user._id,
            username: req.user.username
        };
    var newCampground = {name: name, image: image, price: price, description: description, author: author};
    Campground.create(newCampground, function(err, newCreate){
        if(err){
            console.log(err);
        } else {
            console.log('New Campground \n'+newCreate);
        }
    });
    req.flash('success', 'Successfully added campground');
    res.redirect('/campgrounds');
});

router.get('/new', middleWare.isLoggedIn, function(req, res){
   res.render('campgrounds/new');
});

router.get('/:id', function(req, res){
   Campground.findById(req.params.id).populate('comments').exec(function(err, found){
       if(err){
           console.log(err);
           res.redirect('/');
       } else {
           console.log(found);
           res.render('campgrounds/show', {campground: found});
       }
   });
});


router.get('/:id/edit', middleWare.checkCampgroundOwner, function(req, res){
    Campground.findById(req.params.id, function(err, found){
       if(err){
           console.log(err);
           res.redirect('/campgrounds');
       } else {
           res.render('campgrounds/edit', {campground: found});
       }
    });
});

router.put('/:id', middleWare.checkCampgroundOwner, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           console.log(err);
       }
        res.redirect('/campgrounds/' + req.params.id);
    });
});

router.delete('/:id', middleWare.checkCampgroundOwner, function(req, res){
    Campground.findById(req.params.id, function(err, found){
        if(err){
            console.log(err);
        }
        found.comments.forEach(function(comment){
            Comment.findByIdAndRemove(comment._id);
        });
    });
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/campgrounds');
    });
});

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;