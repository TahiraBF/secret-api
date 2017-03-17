var express       = require('express');
var router        = express.Router();
const mongoose    = require('mongoose');
const User        = require("../models/user");
const Secret      = require("../models/secret");
const upload      = require('../config/multer');
var random        = require('mongoose-simple-random');


router.get('/', (req, res, next) => {
  var user = req.user._id;

  Secret.find({"user": user })
    .exec((err, Secrets) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Secrets);
    });
});

router.put('/', (req, res, next) => {
  var secretId = req.body._id;
  var secret   = req.body.secret;

  Secret.findByIdAndUpdate(secretId, {
    title      : req.body.title,
    location   : req.body.location,
    what       : req.body.what,
    description: req.body.description,
    tips       : req.body.tips,
  }, (err) => {
    if (err) {
      return res.send(err);
    }
  return res.json({message: "Secret updated successfully", secret: secret});
});
});

router.get('/map', (req, res, next) => {
  var user = req.user._id;

  Secret.find({"user": user })
    .exec((err, Secrets) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Secrets);
    });
});


router.post('/add', upload.single('file'), (req, res, next) => {
  // var userId = req.user._id;
  // console.log("user ", userid);

  const addSecret =  new Secret ({
    title       : req.body.title,
    location    : req.body.location,
    what        : req.body.what,
    description : req.body.description,
    tips        : req.body.tips,
    when        : req.body.when,
    image       : `/uploads/${req.file.filename}`,
    user        : req.user
  });

  console.log("loc:", addSecret.location);

  addSecret.save( (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      console.log("secret user", req.user);
      return res.json({ message: 'New secret created!' });
    }
  });
});

router.get('/search', (req, res, next) => {
  Secret.find({})
    .exec((err, Secrets) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Secrets);
    });
});

router.get('/featured', (req, res, next) => {
    console.log("backend secrets");


  Secret.find({}, function(err, result) {
    if (err) {
      return res.send(err);
    } else {
      console.log("results is", result);
      return res.json(result);
    }
  });
});

router.get('/:id', (req, res) => {
  var secretId = req.params.id;


  Secret.findById(secretId)
    .populate("user")
    .exec((err, secret) => {
    if (err) {
      return res.send(err);
    }
    else {
      // console.log("secret user is ", secret);
    return res.json(secret);
  }
    });
});




module.exports = router;
