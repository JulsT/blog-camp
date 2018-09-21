var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Camp = require("./models/camp");
var seedDB =require("./seeds");
var Comment = require("./models/comment");
var User = require("./models/user");
var methodOverride = require("method-override");

var commentRoutes = require("./routes/comments");
var campRoutes = require("./routes/camps");
var authRoutes = require("./routes/auth");
//seedDB();

//mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
mongoose.connect('mongodb://kurt:qwerty1@ds211613.mlab.com:11613/blogcamp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());
//=====Passport configuration

app.use(require("express-session")({
    secret: 'What is goin on here',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(authRoutes);
app.use('/camps',campRoutes);
app.use('/camps/:id/comments/', commentRoutes);


 app.listen(process.env.PORT, process.env.IP, function(){
     console.log('Yelp Camp Server started');
 })