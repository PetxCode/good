const express = require("express");
const upload = require("../utils/multer");
const router = express.Router();
const {
  showImage,
  allImage,
  createImage,
  deleteImage,
} = require("../controller/imageController");

router.route("/:product/:id/limit").get(showImage);
router.route("/:product/:id").get(allImage);

router.route("/:product/:id/create").post(upload, createImage);
router.route("/:product/:id/:image/delete").delete(deleteImage);

module.exports = router;
