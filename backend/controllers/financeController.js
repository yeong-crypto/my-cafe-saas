const Cost = require("../models/Cost");
const { calculateNetProfit } = require("../services/profitCalculator");

const createCost = async (req, res) => {
  try {
    const { type, name, amount, date } = req.body;
    const newCost = new Cost({ type, name, amount, date });
    await newCost.save();
    res.json({ message: "Cost saved!", cost: newCost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const listCosts = async (_req, res) => {
  try {
    const costs = await Cost.find().sort({ date: -1 });
    res.json(costs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const calculateProfit = async (req, res) => {
  try {
    const { monthlyRevenue = 0, fixedCosts = [], variableCosts = [] } = req.body;
    const result = calculateNetProfit({
      revenue: Number(monthlyRevenue),
      fixedCosts,
      variableCosts,
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createCost,
  listCosts,
  calculateProfit,
};
