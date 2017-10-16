var express = require('express'),
    //merge params allosw the url parameteres to be passed through the refactor and descend to the child element
    router = express.Router({mergeParams: true}),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    //index.js is automatically required when you require a directory and not a file
    middleWare =  require('../middleware');

router.post('/', middleWare.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
       if(!err){
            Comment.create(req.body.comment, function(err, data){
                if(!err){
                    //add username and ID
                    data.author.id = req.user._id;
                    data.author.username = req.user.username;
                    //save comment
                    data.save();
                   camp.comments.push(data);
                   camp.save();
                   res.redirect('/campgrounds/' + camp._id);
                }
            });
       }
   });
});

router.put('/:cid', middleWare.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.cid, req.body.comment, function(err, comment){
        if(err){
            req.flash('error', 'Something went wrong. ');
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

router.delete('/:cid', middleWare.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.cid, function(err){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong. ');
        }
        res.redirect('/campgrounds/' + req.params.id);
    });
});

module.exports = router;