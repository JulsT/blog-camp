var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");
var {checkCampOwner, isLoggedIn} = require("../middleware/index");

router.get('/', function(req, res){
     Camp.find({}, function(err, allCamps){
         if(err){
             console.log(err);
         } else{
             res.render('camps/index', {camps: allCamps});
         }
     })
 });
 router.post('/', isLoggedIn, function(req,res){
     var name = req.body.name;
     var image = req.body.image;
     var description = req.body.description;
     var price = req.body.price;
     var author = {
		id: req.user._id,
		username: req.user.username
	}
      Camp.create({
        name, image, description, price, author
        }, function(err, camp){
            if (err) {
                console.log(err);
            }else{
                res.redirect('/camps');
        }
        });
 });
 router.get('/new', isLoggedIn, function (req,res){
     res.render('camps/new');
 });
 router.get('/:id', function(req, res) {
     Camp.findById(req.params.id).populate('comments').exec(function(err, foundCamp){
         if (err || !foundCamp) {
             req.flash('error', 'Camp not found');
             res.redirect('/camps');
         } else {
             res.render('camps/show', {camp: foundCamp});
         }
     });
 });
 
 //Edit camp
 router.get('/:id/edit', checkCampOwner ,function(req, res) {
    Camp.findById(req.params.id, function (err, camp) {
        res.render('camps/edit', {camp: camp}); 
    })
 })
 //Update camp
 router.put('/:id',checkCampOwner, function(req, res){
     Camp.findOneAndUpdate(req.params.id, req.body.camp ,function(err,camp){
         if(err){
             res.render('camps/edit');
         }else{
             res.redirect(`/camps/${req.params.id}`)
         }
     })
 })
 //delete camp
 router.delete('/:id',checkCampOwner, function(req, res){
     Camp.findOneAndDelete(req.params.id, function(err){
         if(err){
             console.log(err);
         }
         res.redirect('/camps');
     });
 });

 module.exports = router;