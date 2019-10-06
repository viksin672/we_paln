var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var User  = require("./models/user");
var Query  = require("./models/query");

var    mongoose    = require("mongoose"),
       passport    = require("passport"),
     LocalStrategy = require("passport-local");


mongoose.connect("/Put four database credentials/", {useMongoClient: true});



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again cutest dog!",
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
   next();
});

app.get("/",function (req,res) {
  res.render("landing")
});




//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
   res.render("landing");
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username,email: req.body.email,phone: req.body.phone});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("landing");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/home");
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("landing");
});
// show home
app.get("/home", function(req, res){
    res.render("home");
 });
// handling login logic
app.post("/login", passport.authenticate("local",
   
{   
        successRedirect: "/home",
        failureRedirect: "/"
    }),
     function(req, res){
         
});

//add query
app.post("/budget",function(req,res) {
    // add author to query
    console.log("text");
    req.body.query.author = {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      phone: req.user.phone
      
    }
  Query.create(req.body.query,isLoggedIn,function (err,newQuery) {
      if(err){
            res.redirect('/Home');
      }else{
          
       res.redirect('/Home');
  
      }
    });
  });

// logout route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
 }

app.listen(process.env.PORT || 5000,function() {
  console.log("ittur server started!!")
});
