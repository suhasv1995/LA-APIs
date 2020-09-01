var mongoose = require("mongoose");

var adminLoginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 10,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    logintype: {
      type: String,
      maxlength: 20,
    },
    status: {
      type: Number, // 0 - deleted, 1 - active, 2 - inactive
      min: 0,
      max: 2,
      default: 1,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("adminlogin", adminLoginSchema);
