var express         = require('express');
var router          = express.Router();
var jwt             = require('jsonwebtoken');
var jwtOptions      = require('../config/jwtOptions');


// Our user model
const User          = require("../models/user");
const PendingUser          = require("../models/pendingUser");

// Bcrypt let us encrypt passwords
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;


router.post("/login", function(req, res) {

  if(req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
  }

  if (username === "" || password === "") {
    res.status(401).json({message:"fill up the fields"});
    return;
  }

  User.findOne({ "username": username }, (err, user)=> {

  	if( ! user ){
	    res.status(401).json({message:"no such user found"});
	  } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        console.log(isMatch);
        if (!isMatch) {
          res.status(401).json({message:"passwords did not match"});
        } else {
          var payload = {id: user._id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({message: "ok", token: token});
        }
      });
    }
  });
});



router.post("/signup", (req, res, next) => {
  var username      = req.body.username;
  var password      = req.body.password;
  var name          = req.body.name;
  var travellerType = req.body.travellerType;
  var description   = req.body.description;
  var referredBy    = req.body.referredBy;
  var isDisclaimer  = req.body.isDisclaimer;
  var foundUsHow    = req.body.foundUsHow;


  if (!username || !password || !name || !isDisclaimer || !description) {
    res.status(400).json({ message: "Please fill in all of the fields" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'user exist' });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = PendingUser({
      username,
      name,
      travellerType,
      description,
      foundUsHow,
      isDisclaimer,
      referredBy,
      password: hashPass
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        var payload = {id: user._id};
        console.log('user', user);
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({message: "ok", token: token});
      	// res.status(200).json(user);
      }
    });
  });
});

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login');
    }
  };
}

router.get('/admin', checkRoles('Admin'), (req, res) => {

  User.findOne({username: req.user.username}, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      console.log("this user is an admin");
      res.json(user);
    }
  });
});

// router.get('/admin', function(req, res) {
//   var admin = req.user.role;
//
//   if (admin === "Admin") {
//     res.json({message: "Is admin"});
//   } else {
//     res.status(401).json({message: "Not admin"});
//   }
// });

module.exports = router;
