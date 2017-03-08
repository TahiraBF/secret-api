var express       = require('express');
var router        = express.Router();
const User        = require("../models/user");
const Secret      = require("../models/secret");


router.get('/', (req, res, next) => {
  Secret.find({})
    .exec((err, Secrets) => {
      if (err) {
        return res.send(err);
      }
      console.log("secret is ", Secrets);
      return res.json(Secrets);
    });
});

router.post('/',  (req, res, next) => {

  const addSecret = new Secret ({
    where       : req.body.where,
    location    : req.body.location,
    what        : req.body.what,
    description : req.body.description,
    tips        : req.body.tips,
    when        : req.body.when,
    user        : req.body.user
  });


  addSecret.save( (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      console.log("new secret ", addSecret);
      return res.json({ message: 'New secret created!' });
    }
  });
});

module.exports = router;
