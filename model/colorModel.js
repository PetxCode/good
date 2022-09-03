const mongoose = require("mongoose");

const colorModel = mongoose.Schema(
  {
    color: {
      type: String,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("colors", colorModel);
