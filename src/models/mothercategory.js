const mongoose = require("mongoose");

const mothercategorySchema = new mongoose.Schema(
  {
    mcName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    mcSmallDesc: {
      type: String,
      trim: true,
    },
    mcDesc: {
      type: String,
      trim: true,
    },
    minOrderValue: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
    },
    deliveryDuration: {
      type: Number, // in 5 hours / 2-3 days
    },
    deliveryDurationText: {
      type: String, // hours / days
    },
    expressMultiplier: {
      type: Number, // 2.5X / 1x on total amount
    },
    expressDeliveryDuration: {
      type: Number, // 1 hour, 2 hours
    },
    expressDeliveryDurationText: {
      type: String, // hours , days
    },
    mcImage: {
      type: String, // image url
      trim: true,
    },
    mcStatus: {
      type: Number, // 0 - inactive, 1 - active
      min: 0,
      max: 1,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("motherCategory", mothercategorySchema);
