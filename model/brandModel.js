const mongoose = require("mongoose");

const brandModel = mongoose.Schema(
  {
    brandName: {
      type: String,
    },
    logo: {
      type: String,
    },
    logoID: {
      type: String,
    },

    product: [
      {
        type: mongoose.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("brands", brandModel);
