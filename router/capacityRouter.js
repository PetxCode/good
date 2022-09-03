const express = require("express");
const router = express.Router();
const {
  showCapacity,
  allCapacity,
  createCapacity,
  deleteCapacity,
} = require("../controller/capacityController");

router.route("/:id/limit").get(showCapacity);
router.route("/:id").get(allCapacity);

router.route("/:id/create").post(createCapacity);
router.route("/:id/:capaty/delete").delete(deleteCapacity);

module.exports = router;
