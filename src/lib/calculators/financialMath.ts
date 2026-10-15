/** Pure budgeting arithmetic. These estimates do not establish lender eligibility. */
export function validateNumbers(values: Record<string, number>, positive: string[] = [], percentages: string[] = []): string | undefined {
  for (const [name, value] of Object.entries(values)) {
    if (!Number.isFinite(value) || value < 0 || value > 1e14) return `${name}: enter a finite, non-negative amount.`;
    if (positive.includes(name) && value <= 0) return `${name}: enter a value greater than zero.`;
    if (percentages.includes(name) && value > 100) return `${name}: enter a percentage from 0 to 100.`;
  }
}
export function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (![principal, annualRate, months].every(Number.isFinite) || principal < 0 || annualRate < 0 || months <= 0) return 0;
  if (principal === 0) return 0;
  const r = annualRate / 1200;
  return r === 0 ? principal / months : principal * r / -Math.expm1(-months * Math.log1p(r));
}
export function loanFromPayment(payment: number, annualRate: number, months: number): number {
  if (![payment, annualRate, months].every(Number.isFinite) || payment < 0 || annualRate < 0 || months <= 0) return 0;
  const r = annualRate / 1200;
  return r === 0 ? payment * months : payment * -Math.expm1(-months * Math.log1p(r)) / r;
}
export function prepaymentImpact(principal: number, annualRate: number, months: number, amount: number, frequency: string) {
  const payment = monthlyPayment(principal, annualRate, months);
  if (!payment || !Number.isFinite(amount) || amount <= 0 || months > 600 || !Number.isInteger(months)) return { interestSaved: 0, monthsReduced: 0 };
  const schedule = (extra: number) => {
    let balance = principal, interest = 0, duration = 0;
    while (balance > 0.000001 && duration < months) {
      duration += 1;
      const charge = balance * annualRate / 1200;
      interest += charge;
      balance = Math.max(0, balance + charge - Math.min(payment, balance + charge));
      const due = frequency === "annual" ? duration % 12 === 0 : duration === 1;
      if (due) balance = Math.max(0, balance - Math.min(extra, balance));
    }
    return { interest, duration };
  };
  const baseline = schedule(0), prepaid = schedule(amount);
  return { interestSaved: Math.max(0, baseline.interest - prepaid.interest), monthsReduced: Math.max(0, baseline.duration - prepaid.duration) };
}
export function affordability(income: number, obligations: number, expenses: number, ratio: number) {
  const disposable = Math.max(0, income - obligations - expenses);
  return Math.max(0, Math.min(disposable, income * ratio / 100 - obligations));
}
