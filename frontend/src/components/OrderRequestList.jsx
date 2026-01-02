import React from "react";

const OrderRequestList = ({ orders = [] }) => {
  return (
    <div className="card">
      <h3>발주 요청</h3>
      {orders.length === 0 ? (
        <p>발주 요청이 없습니다.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              #{order.id} - {order.status} ({order.createdAt})
            </li>
          ))}
        </ul>
      )}
      <p className="hint">백엔드 `/orders` API와 연결해 발주/상태 추적 예정</p>
    </div>
  );
};

export default OrderRequestList;
