const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");
const upload = require("../utils/multer");

router.route("/").get(getProducts);
router.route("/create").post(upload, createProduct);
router.route("/:id").get(getProduct);
router.route("/:id").patch(updateProduct);
router.route("/:id").delete(deleteProduct);

module.exports = router;
