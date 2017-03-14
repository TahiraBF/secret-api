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

router.post('/add', upload.single('file'), (req, res, next) => {
  // var userId = req.user._id;
  // console.log("user ", userid);

  const addSecret =  new Secret ({
    where       : req.body.where,
    location    : req.body.location,
    what        : req.body.what,
    description : req.body.description,
    tips        : req.body.tips,
    when        : req.body.when,
    image       : `/uploads/${req.file.filename}`,
    user        : req.user._id
  });


  addSecret.save( (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
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

  Secret.findRandom({}, {}, {limit: 4}, function(err, results) {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });

});


module.exports = router;
