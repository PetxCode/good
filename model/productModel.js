const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    productName: {
      type: String,
    },
    productType: {
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
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },

    capacity: [
      {
        type: mongoose.Types.ObjectId,
        ref: "capacities",
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
