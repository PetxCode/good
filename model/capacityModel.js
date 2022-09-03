const mongoose = require("mongoose");

const capacityModel = mongoose.Schema(
  {
    size: {
      type: String,
    },

    price: {
      type: Number,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("capacities", capacityModel);
