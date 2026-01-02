import React, { useState } from "react";

const CostForm = () => {
  const [form, setForm] = useState({ type: "fixed", name: "", amount: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: POST /cost 연결
    console.info("submit cost", form);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>비용 입력</h3>
      <label>
        구분
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="fixed">고정비</option>
          <option value="variable">변동비</option>
        </select>
      </label>
      <label>
        항목명
        <input name="name" value={form.name} onChange={handleChange} placeholder="예: 임대료" />
      </label>
      <label>
        금액
        <input name="amount" value={form.amount} onChange={handleChange} placeholder="500000" />
      </label>
      <button type="submit">저장</button>
    </form>
  );
};

export default CostForm;
