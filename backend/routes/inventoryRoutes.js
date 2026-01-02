const express = require("express");
const {
  getInventory,
  getLowInventory,
  addInventoryItem,
  createOrder,
  listOrders,
} = require("../controllers/inventoryController");

const router = express.Router();

router.get("/inventory", getInventory);
router.get("/inventory/low", getLowInventory);
router.post("/inventory", addInventoryItem);
router.post("/orders", createOrder);
router.get("/orders", listOrders);

module.exports = router;
