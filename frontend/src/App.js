import React, { useMemo, useState } from "react";
import CostForm from "./components/CostForm";
import RevenueInput from "./components/RevenueInput";
import ProfitSummary from "./components/ProfitSummary";
import InventoryAlerts from "./components/InventoryAlerts";
import OrderRequestList from "./components/OrderRequestList";
import "./App.css";

const dummyCosts = {
  fixed: [
    { name: "임대료", amount: 1000000 },
    { name: "관리비", amount: 200000 },
  ],
  variable: [
    { name: "원두", amount: 300000 },
    { name: "컵/빨대", amount: 100000 },
  ],
};

const dummyInventory = [
  { id: 3, name: "원두", qty: 5, threshold: 6, unit: "kg" },
  { id: 4, name: "바닐라 시럽", qty: 1, threshold: 2, unit: "병" },
];

const dummyOrders = [{ id: 1, status: "요청", createdAt: "2024-05-01T09:00:00Z" }];

function App() {
  const [revenue, setRevenue] = useState(0);
  const totals = useMemo(() => {
    const fixedTotal = dummyCosts.fixed.reduce((sum, cost) => sum + cost.amount, 0);
    const variableTotal = dummyCosts.variable.reduce((sum, cost) => sum + cost.amount, 0);
    return { fixedTotal, variableTotal };
  }, []);

  return (
    <div className="App">
      <header className="hero">
        <h1>무인카페 운영 SaaS (MVP)</h1>
        <p>고정비/변동비 · 매출 · 재고를 한눈에 보고 순이익을 자동 계산하세요.</p>
      </header>

      <main className="grid">
        <CostForm />
        <RevenueInput onChange={setRevenue} />
        <ProfitSummary revenue={revenue} fixedTotal={totals.fixedTotal} variableTotal={totals.variableTotal} />
        <InventoryAlerts items={dummyInventory} />
        <OrderRequestList orders={dummyOrders} />
      </main>
    </div>
  );
}

export default App;
