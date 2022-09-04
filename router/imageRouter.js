const express = require("express");
const upload = require("../utils/multer");
const router = express.Router();
const {
  showImage,
  allImage,
  createImage,
  deleteImage,
} = require("../controller/imageController");

router.route("/:id/limit").get(showImage);
router.route("/:id").get(allImage);

router.route("/:id/create").post(upload, createImage);
router.route("/:id/:image/delete").delete(deleteImage);

module.exports = router;
