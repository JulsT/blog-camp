var express = require("express");
var router = express.Router({mergeParams: true});
var Camp = require("../models/camp");
var Comment = require("../models/comment");
var {checkCommentOwner, isLoggedIn} = require("../middleware/index");

router.get('/new',isLoggedIn, function(req, res) {
     Camp.findById(req.params.id, function(err, foundCamp){
         if(err){
             console.log(err);
         } else{
            res.render('comments/new', {camp: foundCamp}); 
         }
     });
 });
 
 router.post('/',isLoggedIn, function(req,res){
     Camp.findById(req.params.id, function(err, foundCamp){
         if(err){
             console.log(err);
             res.redirect('/camps');
         }else{
             Comment.create(req.body.comment, function(err, comment){
                 if(err){
                     req.flash('error', 'Something went wrong')
                     console.log(err);
                 }else{
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     comment.save();
                     foundCamp.comments.push(comment);
                     foundCamp.save();
                     req.flash('success', 'New comment added');
                     res.redirect(`/camps/${req.params.id}`);
                 }
             });
         }
     });
 });
 //edit comment
 router.get('/:comment_id/edit', checkCommentOwner, function(req, res){
             Camp.findById(req.params.id, function(err, foundCamp) {
                 if(err || !foundCamp){
                     req.flash('error', 'No camp found');
                     return res.redirect('back');
                 }
                 Comment.findById(req.params.comment_id, function(err, comment){
                     if(err){
                         console.log(err);
                     }else{
                        res.render('comments/edit', {camp_id: req.params.id, comment: comment}); 
                     }
                 });
             })
 });
 router.put('/:comment_id',checkCommentOwner, function(req,res){
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
         if(err){
             console.log(err);
         }else{
             res.redirect(`/camps/${req.params.id}`)
         }
     })
 })
 
 router.delete('/:comment_id',checkCommentOwner, function(req, res){
     Comment.findByIdAndRemove(req.params.comment_id, function(err){
         if(err){
             console.log(err);
             res.redirect('back');
         } else{
             req.flash('success', 'Comment deleted');
             res.redirect(`/camps/${req.params.id}`)
         }
     });
 });

 module.exports = router;