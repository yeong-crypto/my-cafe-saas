require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const financeRoutes = require("./routes/financeRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Cafe SaaS backend is running!" });
});

app.use(financeRoutes);
app.use(inventoryRoutes);

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});
