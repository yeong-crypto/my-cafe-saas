const mongoose = require("mongoose");

const costSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 고정비 or 변동비
  name: { type: String, required: true }, // 항목 이름 (임대료, 전기세 등)
  amount: { type: Number, required: true }, // 금액
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cost", costSchema);
