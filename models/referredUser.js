const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const referredUserSchema = new Schema({
  referredBy : {type : Schema.Types.ObjectId, ref: 'User'},
  refEmail   : String
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const ReferredUser = mongoose.model("ReferredUser", referredUserSchema);
module.exports = ReferredUser;
