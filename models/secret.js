const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const secretSchema = new Schema({
  where       : String,
  location    : String,
  what        : [String],
  description : String,
  tips        : String,
  when        : Date,
  user        : {type : Schema.Types.ObjectId, ref: 'User'},

},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Secret = mongoose.model("Secret", secretSchema);
module.exports = Secret;
