let inventory = [
  { id: 1, name: "Hot Cup", category: "소모품", qty: 120, threshold: 30, unit: "개" },
  { id: 2, name: "Iced Cup", category: "소모품", qty: 80, threshold: 20, unit: "개" },
  { id: 3, name: "원두(시그니처블렌드)", category: "원자재", qty: 5, threshold: 2, unit: "kg" },
  { id: 4, name: "바닐라 시럽", category: "부자재", qty: 3, threshold: 1, unit: "병" },
];

let orders = [];

const getInventory = (_req, res) => {
  res.json(inventory);
};

const getLowInventory = (_req, res) => {
  const lowItems = inventory.filter((item) => item.qty <= item.threshold);
  res.json(lowItems);
};

const addInventoryItem = (req, res) => {
  const item = req.body;
  inventory.push(item);
  res.json({ status: "ok" });
};

const createOrder = (req, res) => {
  const { items, memo } = req.body;
  const newOrder = {
    id: orders.length + 1,
    items,
    memo: memo || "",
    createdAt: new Date().toISOString(),
    status: "요청",
  };
  orders.push(newOrder);
  res.json({ status: "ok", order: newOrder });
};

const listOrders = (_req, res) => {
  res.json(orders);
};

module.exports = {
  getInventory,
  getLowInventory,
  addInventoryItem,
  createOrder,
  listOrders,
};
