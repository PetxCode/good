const express = require("express");
const cors = require("cors");
require("./utils/db");
const port = 2002;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Server is located and working fine!" });
  } catch (error) {
    res.status(404).json({ message: "Error locating servers" });
  }
});

app.use("/api/product", require("./router/productRouter"));
app.use("/api/color", require("./router/colorRouter"));
app.use("/api/capacity", require("./router/capacityRouter"));

app.listen(port, () => {
  console.log("Our server is now connected...!");
});
