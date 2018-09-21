var Camp = require("../models/camp");
var Comment = require("../models/comment");

 //middleware
   function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
        return  next();
     }
     req.flash('error', 'You need to be logged in to do that');
     res.redirect('/login');
 }
 
function checkCommentOwner ( req, res, next){
     if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id, function (err, comment) {
         if(err || !comment){
             req.flash('error', 'Comment not found');
             res.redirect('back');
         }else{
             if(comment.author.id.equals(req.user._id)){
                  next();
             } else{
                 req.flash('error', 'You do not have permission  to do that');
                 res.redirect('back');
             }
         }
        });
     }else{
         req.flash('error', 'You need to be logged in to do that');
         res.redirect('/login');
     }
 }
  function checkCampOwner ( req, res, next){
     if(req.isAuthenticated()){
         Camp.findById(req.params.id, function (err, camp) {
         if(err || !camp){
             req.flash('error', 'Camp not found');
             res.redirect('back');
         }else{
             if(camp.author.id.equals(req.user._id)){
                  next();
             } else{
                 req.flash('error', 'You do not have permission  to do that');
                 res.redirect('back');
             }
         }
        });
     }else{
         req.flash('error', 'You need to be logged in to do that');
         res.redirect('/login');
     }
 }


module.exports = {
    isLoggedIn,
    checkCampOwner,
    checkCommentOwner
};