var express       = require('express');
var router        = express.Router();
const User        = require("../models/user");
const PendingUser = require("../models/pendingUser");
const Secret      = require("../models/secret");
const Picture     = require("../models/picture");
const mongoose    = require('mongoose');
const upload = require('../config/multer');


/* GET users listing. */
router.get('/', function(req, res, next) {
  PendingUser.find({}, (err, pendingUsers)=> {
    if (err) {
      res.send(err);
    } else {
      res.json(pendingUsers);
    }
  });
});

router.get('/:id', (req, res, next) => {
  var userId = req.params.id;

  PendingUser.findById(userId, (err, user) => {
    if (err){
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

router.post('/:id', function(req, res, next) {
  PendingUser.findById(req.params.id, (err, user) => {
    if (err){
      res.send(err);
    } else {
        const newUser = User({
          username : user.username,
          password : user.password,
          name : user.name,
          travellerType : user.travellerType,
          description : user.description,
          refer : " ",
          profilePic: " ",
          isDisclaimer: true,
          role: 'User'
        });
        newUser.save((err, user) => {
          if (err) {
            res.status(400).json({ message: err });
          } else {
            res.status(200).json({message: "user saved"});
          }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  PendingUser.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    } else {
      res.json({
        message: 'Pending user has been removed!'
      });
    }
  });
});

router.post('/', upload.single('file'), function(req, res) {
  var userId = req.user._id;
  console.log("put:", userId);

  User.findByIdAndUpdate(userId, {
    profilePic: `/uploads/${req.file.filename}`,
  }, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        message: 'Profile pic updated successfully'
      });
    }

  // var profilePic = Picture({
  //   pic_path: `/uploads/${req.file.filename}`,
  //   pic_name: req.file.originalname,
	// 	user: userId,
  //   profile: true
  // });
  //
  // profilePic.save((err)=> {
  //   if (err){
  //     res.send(err)
  //   } else {
  //     console.log("Im here");
  //     return res.json({
  //     message: 'Profile picture saved successfully'
  //     });
  //   }
  // });
  });
});

router.put('/', function(req, res) {
  var userId = req.body._id;

  User.findByIdAndUpdate(userId, {
    username: req.body.username,
    name: req.body.name,
    travellerType: req.body.travellerType,
    profilePic: " ",
    description: req.body.description
  }, (err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        message: 'User updated successfully'
      });
    }
  });
});

// REFER A USER
router.get('/refer', function(req, res) {
  // var referArray = [ ];
  // var refer      = req.user.refer;
  console.log("ref", req.user.refer);
  if(err){
    console.log("error");
    return res.send(err);
  } else {
    return res.json({ message: 'referral added'});
  }



  // refer.push.


});

module.exports = router;
