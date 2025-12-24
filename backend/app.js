const Cost = require("./models/Cost");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB connection error:", err));


const app = express();
app.use(cors());
app.use(express.json());

// 테스트 라우트
app.get("/", (req, res) => {
  res.json({ message: "Cafe SaaS backend is running!" });
});

let inventory = [
  { id: 1, name: "Hot Cup", category: "소모품", qty: 120, threshold: 30, unit: "개" },
  { id: 2, name: "Iced Cup", category: "소모품", qty: 80, threshold: 20, unit: "개" },
  { id: 3, name: "원두(시그니처블렌드)", category: "원자재", qty: 5, threshold: 2, unit: "kg" },
  { id: 4, name: "바닐라 시럽", category: "부자재", qty: 3, threshold: 1, unit: "병" }
];


app.get("/inventory", (req, res) => {
  res.json(inventory);
});

// 재고 부족 항목만
app.get("/inventory/low", (req, res) => {
  const lowItems = inventory.filter(item => item.qty <= item.threshold);
  res.json(lowItems);
});

let orders = []; // 메모리 상 발주 리스트

app.post("/orders", (req, res) => {
  const { items, memo } = req.body; // items: [{id, qty}, ...]
  const newOrder = {
    id: orders.length + 1,
    items,
    memo: memo || "",
    createdAt: new Date().toISOString(),
    status: "요청"
  };
  orders.push(newOrder);
  res.json({ status: "ok", order: newOrder });
});

// 발주 목록 조회
app.get("/orders", (req, res) => {
  res.json(orders);
});


app.post("/inventory", (req, res) => {
  const item = req.body;
  inventory.push(item);
  res.json({ status: "ok" });
});

// 💰 비용 등록 API
app.post("/cost", async (req, res) => {
  try {
    const { type, name, amount } = req.body;

    const newCost = new Cost({
      type,
      name,
      amount
    });

    await newCost.save(); // MongoDB 저장

    res.json({ message: "Cost saved!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 💰 비용 목록 조회 API
app.get("/cost", async (req, res) => {
  try {
    const costs = await Cost.find().sort({ date: -1 });
    res.json(costs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(4000, () => {
  console.log("Backend running on port 4000");
});


