const mongoose = require("mongoose");

const imageModel = mongoose.Schema(
  {
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("images", imageModel);
