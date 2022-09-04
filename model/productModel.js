const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    model: {
      type: String,
    },
    batteryLife: {
      type: Number,
    },
    screen: {
      type: String,
    },
    finger: {
      type: Boolean,
    },
    faceID: {
      type: Boolean,
    },
    network: {
      type: String,
    },
    camera: {
      type: String,
    },

    capacity: [
      {
        type: mongoose.Types.ObjectId,
        ref: "capacities",
      },
    ],

    phoneImage: [
      {
        type: mongoose.Types.ObjectId,
        ref: "images",
      },
    ],

    color: [
      {
        type: mongoose.Types.ObjectId,
        ref: "colors",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productModel);
