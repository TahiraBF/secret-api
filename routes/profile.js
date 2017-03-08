var express       = require('express');
var router        = express.Router();
const User        = require("../models/user");
const PendingUser = require("../models/pendingUser");
const Secret      = require("../models/secret");
const mongoose    = require('mongoose');

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

router.delete('/', function(req, res, next) {

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


module.exports = router;
