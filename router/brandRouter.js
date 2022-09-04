const express = require("express");
const upload = require("../utils/multer");
const router = express.Router();
const {
  createBrand,
  getBrands,
  getBrand,
  deleteBrand,
  updateBrand,
} = require("../controller/brandController");

router.route("/:id").get(getBrand);
router.route("/").get(getBrands);

router.route("/:id/update").patch(updateBrand);

router.route("/create").post(upload, createBrand);
router.route("/:id/delete").delete(deleteBrand);

module.exports = router;
