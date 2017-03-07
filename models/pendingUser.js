const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pendingUserSchema = new Schema({
  username      : String,
  password      : String,
  name          : String,
  travellerType : String,
  description   : String,
  foundUsHow    : String,
  isDisclaimer  : Boolean,
  approved      : Boolean,
  referredBy    : String,
  role          : {type: String, enum : ['User', 'Admin'],
    default: 'User'}
},
{
  timestamps    : {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
module.exports = PendingUser;
