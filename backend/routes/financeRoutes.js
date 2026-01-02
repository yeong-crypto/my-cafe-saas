const express = require("express");
const { createCost, listCosts, calculateProfit } = require("../controllers/financeController");

const router = express.Router();

router.post("/cost", createCost);
router.get("/cost", listCosts);
router.post("/profit", calculateProfit);

module.exports = router;
