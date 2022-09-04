const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");

router.route("/:id/limit").get(getProduct);
router.route("/:id").get(getProducts);

router.route("/:id/update").patch(updateProduct);

router.route("/:id/create").post(createProduct);
router.route("/:id/:brand/delete").delete(deleteProduct);

module.exports = router;
