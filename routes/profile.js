var express       = require('express');
var router        = express.Router();
const User        = require("../models/user");
const PendingUser = require("../models/pendingUser");
const Secret      = require("../models/secret");

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

// router.post('/', function(req, res, next) {
//
//
//
//   const newUser = User({
//     username,
//     password,
//     name,
//     travellerType,
//     description,
//     refer : ""
//     isDisclaimer: true,
//     role: 'User'
//   });
//
//   newUser.save((err, user) => {
//     if (err) {
//       res.status(400).json({ message: err });
//     } else {
//       res.status(200).json({message: "user saved"});
//     }
//   })
// });


module.exports = router;
