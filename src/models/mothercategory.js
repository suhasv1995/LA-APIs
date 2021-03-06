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
    mcMinOrderValue: {
      type: Number,
      required: true,
    },
    mcDeliveryCharge: {
      type: Number,
    },
    mcDeliveryDuration: {
      type: Number, // in 5 hours / 2-3 days
    },
    mcDeliveryDurationText: {
      type: String, // hours / days
    },
    mcExpressMultiplier: {
      type: Number, // 2.5X / 1x on total amount
    },
    mcExpressDeliveryDuration: {
      type: Number, // 1 hour, 2 hours
    },
    mcExpressDeliveryDurationText: {
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
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("motherCategory", mothercategorySchema);
