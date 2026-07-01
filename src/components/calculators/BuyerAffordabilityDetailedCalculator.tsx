"use client";

import React, { useState } from "react";
import { formatINR } from "@/lib/utils";
import { CalculatorShell } from "./CalculatorShell";
import { CalculatorActionBar } from "./CalculatorActionBar";

export const BuyerAffordabilityDetailedCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [coApplicantIncome, setCoApplicantIncome] = useState(50000);
  const [existingObligations, setExistingObligations] = useState(20000);
  const [householdExpenses, setHouseholdExpenses] = useState(40000);
  const [downPayment, setDownPayment] = useState(1500000);
  const [emergencyReserve, setEmergencyReserve] = useState(300000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [emiComfortPercent, setEmiComfortPercent] = useState(35);
  const [buyerType, setBuyerType] = useState("end_user"); // end_user, investor, nri, hni
  const [purchaseTimeline, setPurchaseTimeline] = useState("immediate"); // immediate, 3_6_months, 1_year

  const totalIncome = monthlyIncome + coApplicantIncome;
  const netDownPaymentAvailable = Math.max(0, downPayment - emergencyReserve);

  const safeEmiRatio = emiComfortPercent / 100;
  const safeEmi = Math.max(0, (totalIncome * safeEmiRatio) - existingObligations);
  const aggressiveEmi = Math.max(0, (totalIncome * 0.45) - existingObligations);

  const r = interestRate / 12 / 100;
  const n = tenure * 12;

  let safeLoan = 0;
  let aggressiveLoan = 0;
  if (r > 0) {
    safeLoan = (safeEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    aggressiveLoan = (aggressiveEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  } else {
    safeLoan = safeEmi * n;
    aggressiveLoan = aggressiveEmi * n;
  }

  const safeBudget = safeLoan + netDownPaymentAvailable;
  const aggressiveBudget = aggressiveLoan + netDownPaymentAvailable;

  const debtToIncome = ((safeEmi + existingObligations) / totalIncome) * 100;

  // Readiness Score
  let readinessScore = 70;
  if (debtToIncome > 45) readinessScore -= 20;
  if (netDownPaymentAvailable < 500000) readinessScore -= 15;
  if (purchaseTimeline === "immediate") readinessScore += 10;
  readinessScore = Math.max(10, Math.min(100, readinessScore));

  const getRecommendation = () => {
    if (readinessScore >= 80) return "Excellent readiness. Safe budget is fully supported by cash reserves and income buffers.";
    if (readinessScore >= 60) return "Moderate readiness. We recommend increasing down-payment capital or paying down current loans.";
    return "Caution: Current debt obligations are high relative to income. Consider lowering your purchase target.";
  };

  const summaryMarkdown = `### Buyer Affordability Detailed Projections
*   **Total Monthly Income**: ${formatINR(totalIncome)}
*   **Net Down Payment Available**: ${formatINR(netDownPaymentAvailable)}
*   **Safe Monthly EMI Limit**: ${formatINR(Math.round(safeEmi))}
*   **Affordable Loan (Safe)**: ${formatINR(Math.round(safeLoan))}
*   **Safe Purchasing Budget**: ${formatINR(Math.round(safeBudget))}
*   **Aggressive Purchasing Budget**: ${formatINR(Math.round(aggressiveBudget))}
*   **Debt-to-Income Ratio**: ${debtToIncome.toFixed(1)}%
*   **Readiness Score**: ${readinessScore}/100
*   **Recommendation**: ${getRecommendation()}
*   *Note: Planning estimates only. Verify final parameters with lenders.*`;

  const inputs = (
    <div className="space-y-6 text-xs text-slate-700 font-sans">
      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Household Financials
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Primary Monthly Income (INR)</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Co-Applicant Monthly Income (INR)</label>
          <input
            type="number"
            value={coApplicantIncome}
            onChange={(e) => setCoApplicantIncome(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Existing Monthly EMIs (INR)</label>
          <input
            type="number"
            value={existingObligations}
            onChange={(e) => setExistingObligations(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Monthly Household Expenses (INR)</label>
          <input
            type="number"
            value={householdExpenses}
            onChange={(e) => setHouseholdExpenses(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100 pt-2">
        Capital & Preferences
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Down Payment Liquid Funds (INR)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Emergency Reserve Holdback (INR)</label>
          <input
            type="number"
            value={emergencyReserve}
            onChange={(e) => setEmergencyReserve(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tenure (Years)</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Comfort EMI (%)</label>
          <input
            type="number"
            value={emiComfortPercent}
            onChange={(e) => setEmiComfortPercent(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Buyer Segment</label>
          <select
            value={buyerType}
            onChange={(e) => setBuyerType(e.target.value)}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          >
            <option value="end_user">End User</option>
            <option value="investor">Investor</option>
            <option value="nri">NRI Client</option>
            <option value="hni">HNI</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Purchase Timeline</label>
          <select
            value={purchaseTimeline}
            onChange={(e) => setPurchaseTimeline(e.target.value)}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          >
            <option value="immediate">Immediate</option>
            <option value="3_6_months">3 - 6 Months</option>
            <option value="1_year">Within 1 Year</option>
          </select>
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-xs font-sans">
      <div className="border-b border-[#1d3e30] pb-4">
        <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block mb-1">Safe Buying Power</span>
        <div className="text-4xl font-serif font-bold text-white tracking-tight">
          {formatINR(Math.round(safeBudget))}
          <span className="text-xs text-slate-300 font-sans font-medium block mt-1">Suggested Property Budget</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <span className="text-slate-300 block font-medium">Safe EMI Limit</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(safeEmi))}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Aggressive Budget Limit</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(aggressiveBudget))}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-[#1d3e30] pt-4">
        <div>
          <span className="text-slate-300 block font-medium">Suggested Safe Loan</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(safeLoan))}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Net Down Payment Cash</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(netDownPaymentAvailable))}</span>
        </div>
      </div>

      <div className="border-t border-[#1d3e30] pt-4 space-y-2">
        <div className="flex justify-between font-medium">
          <span className="text-slate-300">Debt-to-Income (Safe):</span>
          <span className="text-emerald-400 font-bold">{debtToIncome.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between font-medium">
          <span className="text-slate-300">Readiness score:</span>
          <span className={`font-bold ${readinessScore >= 80 ? "text-emerald-400" : readinessScore >= 60 ? "text-amber-400" : "text-rose-400"}`}>
            {readinessScore}/100
          </span>
        </div>
      </div>

      <div className="bg-[#143125] p-3 rounded border border-emerald-500/20 text-emerald-300 font-medium space-y-1">
        <span className="text-[9px] uppercase font-bold tracking-wider block text-emerald-400">Advisory Assessment</span>
        <p className="text-[11px] leading-relaxed">
          {getRecommendation()}
        </p>
      </div>
    </div>
  );

  const explanation = (
    <div className="space-y-6 text-xs text-slate-600 font-sans leading-relaxed">
      <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Planning Insights & Buying Readiness Guidelines
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Income and Outflow Balance</h4>
          <p>
            Lenders calculate eligibility using the FOIR ratio. Keeping your primary obligations (all home, car, and personal loan EMIs) under 40-45% of gross income protects you against floating interest rate cycles.
          </p>
          <p>
            Remember to hold back at least 6 months of household expenses as emergency cash. Do not utilize 100% of liquid assets for a property down-payment.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Next Steps Checklist</h4>
          <ul className="list-disc pl-4 space-y-1.5 font-medium text-slate-700">
            <li>Pre-close high interest unsecured loans or credit card balances first.</li>
            <li>Get a bank pre-approval letter based on your primary income records.</li>
            <li>Factor in registration costs, stamp duty, and maintenance reserves (usually 8-12% of asset value).</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="Buyer Affordability Desk"
      subtitle="Assess safe purchasing power, down-payment parameters, and debt-to-income buffers."
      category="Buyer Planning"
      inputs={inputs}
      results={results}
      explanation={explanation}
      actionBar={
        <CalculatorActionBar
          calculatorName="Buyer Affordability Detailed Planner"
          summaryMarkdown={summaryMarkdown}
        />
      }
    />
  );
};
