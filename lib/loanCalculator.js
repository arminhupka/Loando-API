const loanCalculator = (amount, interest, period, commission, others) => {
  // const amount = 5900;
  // const interest = 7.2;
  // const period = 30;
  // const commission = 7.2;
  // const others = 3;

  console.log(amount, interest, period, commission, others);

  // Percentage Ratio
  const q = (1 + (interest * 0.01) / 12).toPrecision(10);

  const daily = ((amount + others + amount * (commission / 100)) * Math.pow(q, period) * (q - 1)) / (Math.pow(q, period) - 1);

  const overallCost = (daily * period).toFixed();

  const afterCommission = (amount * (commission / 100) + others).toFixed(0);

  const loanCost = Math.floor(daily * period) - amount.toFixed(0);

  const loanAmount = (amount + others + amount * (commission / 100)).toFixed(0);

  const rrso = ((Math.pow(q, 12) - 1) * 100).toFixed(2);

  return {
    daily: Number(daily.toFixed(0)),
    overallCost: Number(overallCost),
    commission: Number(afterCommission),
    loanCost: Number(loanCost),
    loanAmount: Number(loanAmount),
    rrso: Number(rrso),
  };
};

export default loanCalculator;
