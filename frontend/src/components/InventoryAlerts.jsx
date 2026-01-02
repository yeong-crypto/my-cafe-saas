import React from "react";

const InventoryAlerts = ({ items = [] }) => {
  return (
    <div className="card">
      <h3>재고 부족 알림</h3>
      {items.length === 0 ? (
        <p>모든 재고가 임계치 이상입니다.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - 현재 {item.qty}{item.unit} (임계 {item.threshold}{item.unit})
            </li>
          ))}
        </ul>
      )}
      <p className="hint">백엔드 `/inventory/low` API 연동 예정</p>
    </div>
  );
};

export default InventoryAlerts;
