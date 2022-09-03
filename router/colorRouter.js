const express = require("express");
const router = express.Router();
const {
  showColor,
  allColor,
  createColor,
  deleteColor,
} = require("../controller/colorController");

router.route("/:id/limit").get(showColor);
router.route("/:id").get(allColor);

router.route("/:id/create").post(createColor);
router.route("/:id/:capaty/delete").delete(deleteColor);

module.exports = router;
