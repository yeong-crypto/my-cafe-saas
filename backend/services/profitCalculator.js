const calculateNetProfit = ({ revenue = 0, fixedCosts = [], variableCosts = [] }) => {
  const fixedTotal = fixedCosts.reduce((sum, cost) => sum + Number(cost.amount || 0), 0);
  const variableTotal = variableCosts.reduce((sum, cost) => sum + Number(cost.amount || 0), 0);
  const netProfit = revenue - fixedTotal - variableTotal;

  return {
    revenue,
    fixedTotal,
    variableTotal,
    netProfit,
  };
};

module.exports = {
  calculateNetProfit,
};
