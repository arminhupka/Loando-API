const loanCalculator = (amount, interest, commission, other, days) => {
  const calcDays = days / 30;
  const q = interest / 100 / 12;
  const loanAmount = amount * (commission / 100 + 1) + other;
  const commissionAmount = (commission / 100) * amount;
  const installment = Math.round((100 * (loanAmount * q) * Math.pow(q + 1, calcDays)) / (Math.pow(q + 1, calcDays) - 1)) / 100;
  const toRepaid = Math.round(100 * installment * calcDays) / 100;
  const capitalInterest = Math.round(100 * (toRepaid - amount)) / 100 - commissionAmount;
  const nominalInterest =
    (12 * (95 * calcDays + 9) * capitalInterest) /
    ((1 + parseFloat(calcDays)) * 12 * parseFloat(calcDays) * (4 * amount + capitalInterest));
  const rrso = Math.round((Math.pow(1 + nominalInterest / 12, 12) - 1) * 10000) / 100;

  return {
    days,
    amount,
    commissionAmount: commissionAmount.toFixed(2),
    capitalInterest: capitalInterest.toFixed(2),
    toRepaid: toRepaid.toFixed(2),
    rrso,
  };
};

export default loanCalculator;
