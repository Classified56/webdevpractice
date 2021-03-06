var Campground = require('../models/campground'),
    Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req, res, next){
    req.headers.referer = '/campgrounds/'+req.params.id;
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, found){
            if(err){
                req.flash('error', 'Campground not found.');
                res.redirect('/campgrounds');
            } else {
                //the found object id is still an object while the req.user id is a string
                if(found.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error', 'You don\'t have permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that.');
        return res.redirect('back');
    }
};

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.cid, function(err, found){
        if(err){
            console.log(err);
            req.flash('error', 'Something went wrong.');
            res.redirect('back');
        } else {
            //the found object id is still an object while the req.user id is a string
            if(found.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash('error', 'You need to be logged in to do that.');
                res.redirect('back');
            }
        }
    });
    } else {
        req.flash('error', 'You need to be logged in to do that.');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
};

module.exports = middlewareObj;