import React from "react";

const ProfitSummary = ({ revenue = 0, fixedTotal = 0, variableTotal = 0 }) => {
  const netProfit = revenue - fixedTotal - variableTotal;

  return (
    <div className="card">
      <h3>순이익 자동 계산</h3>
      <ul>
        <li>월 매출: {revenue.toLocaleString()}원</li>
        <li>고정비 합계: {fixedTotal.toLocaleString()}원</li>
        <li>변동비 합계: {variableTotal.toLocaleString()}원</li>
        <li>
          <strong>순이익: {netProfit.toLocaleString()}원</strong>
        </li>
      </ul>
      <p className="hint">백엔드 `/profit` API와 연동해 실시간 계산으로 교체 예정</p>
    </div>
  );
};

export default ProfitSummary;
