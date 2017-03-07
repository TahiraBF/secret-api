const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username      : String,
  password      : String,
  name          : String,
  travellerType : String,
  description   : String,
  refer         : String,
  isDisclaimer  : Boolean,
  role          : {type: String,
                   enum : ['User', 'Admin'],
                   default: 'User'}
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
