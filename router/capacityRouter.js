const express = require("express");
const router = express.Router();
const {
  showCapacity,
  allCapacity,
  createCapacity,
  deleteCapacity,
} = require("../controller/capacityController");

router.route("/:product/:id/limit").get(showCapacity);
router.route("/:product/:id").get(allCapacity);

router.route("/:product/:id/create").post(createCapacity);
router.route("/:product/:id/:capacity/delete").delete(deleteCapacity);

module.exports = router;
