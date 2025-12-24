import React, { useState } from "react";

function App() {
  const [inventory, setInventory] = useState([]);
  const [lowInventory, setLowInventory] = useState([]);
  const [orderMemo, setOrderMemo] = useState("");
  const [message, setMessage] = useState("");

  const [type, setType] = useState("고정비");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

    async function addCost() {
    const response = await fetch("http://localhost:4000/cost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        name,
        amount: Number(amount),
      }),
    });

    if (response.ok) {
      alert("비용이 등록되었습니다.");
      setName("");
      setAmount("");
    } else {
      alert("등록 실패!");
    }
  }


  const loadInventory = async () => {
    const res = await fetch("http://localhost:4000/inventory");
    const data = await res.json();
    setInventory(data);

    const lowRes = await fetch("http://localhost:4000/inventory/low");
    const lowData = await lowRes.json();
    setLowInventory(lowData);
  };

  const createOrderForLowItems = async () => {
    if (lowInventory.length === 0) {
      setMessage("재고 부족 항목이 없습니다.");
      return;
    }

    const items = lowInventory.map(item => ({
      id: item.id,
      qty: item.threshold * 2 // 예: 임계치의 2배만큼 발주
    }));

    const res = await fetch("http://localhost:4000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, memo: orderMemo })
    });

    const data = await res.json();
    if (data.status === "ok") {
      setMessage(`발주 요청이 등록되었습니다. (ID: ${data.order.id})`);
      setOrderMemo("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>무인카페 매장 대시보드 (MVP)</h1>

      <button onClick={loadInventory} style={{ padding: "8px 16px" }}>
        재고 불러오기
      </button>

      {/* 재고 리스트 */}
      <div style={{ marginTop: "20px" }}>
        <h2>전체 재고</h2>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>카테고리</th>
              <th>이름</th>
              <th>수량</th>
              <th>임계치</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr
                key={item.id}
                style={{
                  backgroundColor:
                    item.qty <= item.threshold ? "#ffe5e5" : "white"
                }}
              >
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td>
                  {item.qty} {item.unit}
                </td>
                <td>
                  {item.threshold} {item.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 재고 부족 & 발주 */}
      <div style={{ marginTop: "20px" }}>
        <h2>재고 부족 항목</h2>
        {lowInventory.length === 0 ? (
          <p>재고 부족 항목이 없습니다.</p>
        ) : (
          <ul>
            {lowInventory.map(item => (
              <li key={item.id}>
                [{item.category}] {item.name} — 현재 {item.qty}
                {item.unit} (임계치 {item.threshold}
                {item.unit})
              </li>
            ))}
          </ul>
        )}

        <div style={{ marginTop: "10px" }}>
          <textarea
            placeholder="발주 메모 (예: 컵/리드 재고 부족, 이번 주말 행사 대비)"
            value={orderMemo}
            onChange={e => setOrderMemo(e.target.value)}
            rows={3}
            cols={50}
          />
        </div>

        <button
          onClick={createOrderForLowItems}
          style={{ marginTop: "10px", padding: "8px 16px" }}
        >
          재고 부족 항목 발주 요청 보내기
        </button>

        {message && (
          <p style={{ marginTop: "10px", color: "green" }}>{message}</p>
        )}
      </div>
      <div style={{ padding: "20px", maxWidth: "300px" }}>
  <h2>비용 입력</h2>

  <label>종류</label>
  <select value={type} onChange={(e) => setType(e.target.value)}>
    <option value="고정비">고정비</option>
    <option value="변동비">변동비</option>
  </select>

  <br /><br />

  <label>항목 이름</label>
  <input
    type="text"
    value={name}
    placeholder="예: 임대료"
    onChange={(e) => setName(e.target.value)}
  />

  <br /><br />

  <label>금액</label>
  <input
    type="number"
    value={amount}
    placeholder="예: 1200000"
    onChange={(e) => setAmount(e.target.value)}
  />

  <br /><br />

  <button onClick={addCost}>등록</button>
</div>

    </div>
  );
}

export default App;
