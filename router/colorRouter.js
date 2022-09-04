const express = require("express");
const router = express.Router();
const {
  showColor,
  allColor,
  createColor,
  deleteColor,
} = require("../controller/colorController");

router.route("/:product/:id/limit").get(showColor);
router.route("/:product/:id").get(allColor);

router.route("/:product/:id/create").post(createColor);
router.route("/:product/:id/:capaty/delete").delete(deleteColor);

module.exports = router;
