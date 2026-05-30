export const calculateLoanDetails = (principalAmount: number, tenureDays: number, interestRate: number) => {
  // Simple Interest: SI = (P × R × T) / (365 × 100)
  const interestAmount = (principalAmount * interestRate * tenureDays) / (365 * 100);
  const totalRepayment = principalAmount + interestAmount;
  
  return {
    principalAmount,
    interestAmount: Number(interestAmount.toFixed(2)),
    totalRepayment: Number(totalRepayment.toFixed(2)),
  };
};
