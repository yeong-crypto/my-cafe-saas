import React, { useState } from "react";

const RevenueInput = ({ onChange }) => {
  const [revenue, setRevenue] = useState(0);

  const handleChange = (event) => {
    const value = Number(event.target.value || 0);
    setRevenue(value);
    onChange?.(value);
  };

  return (
    <div className="card">
      <h3>월 매출 입력</h3>
      <input type="number" value={revenue} onChange={handleChange} />
      <p className="hint">입력된 매출은 순이익 계산에 사용됩니다.</p>
    </div>
  );
};

export default RevenueInput;
