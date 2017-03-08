var express       = require('express');
var router        = express.Router();
const User        = require("../models/user");
const PendingUser = require("../models/pendingUser");
const Secret      = require("../models/secret");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // User.find({}, (err, users) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
      PendingUser.find({}, (err, pendingUsers)=> {
        if (err) {
          res.send(err);
        } else {
              res.json({pendingUsers: pendingUsers});
            }
          });
      // }
    // });
  });

// router.get('/', function(req, res, next) {
//   var userId = req.params.id;
//   User.findById(userId, (err, user) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(user);
//     }
//   });
// });



module.exports = router;
