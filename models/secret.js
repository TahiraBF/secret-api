const mongoose = require("mongoose");
var random     = require('mongoose-simple-random');
const Schema   = mongoose.Schema;

const secretSchema = new Schema({
  where       : String,
  location    : String,
  what        : [String],
  description : String,
  tips        : String,
  when        : Date,
  image       : String,
  user        : { type : Schema.Types.ObjectId, ref: 'User'},

},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});
secretSchema.plugin(random);

const Secret = mongoose.model("Secret", secretSchema);
module.exports = Secret;
