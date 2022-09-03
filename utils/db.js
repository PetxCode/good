const mongoose = require("mongoose");

const localURL = "mongodb://localhost/productDB";

mongoose.connect(localURL).then(() => {
  console.log("database now connected");
});

module.exports = mongoose;
