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

router.post('/secrets',  (req, res, next) => {

  const addSecret = Secret ({
    where,
    location,
    what,
    description,
    tips,
    when,
    user

  });


  addSecret.save( (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {

    }
  });
});

module.exports = router;
