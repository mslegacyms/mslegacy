"use client";

import React, { useState } from "react";
import { monthlyPayment, prepaymentImpact, validateNumbers } from "@/lib/calculators/financialMath";
import { formatINR } from "@/lib/utils";
import { CalculatorShell } from "./CalculatorShell";
import { CalculatorActionBar } from "./CalculatorActionBar";

export const HomeLoanEmiDetailedCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(8000000);
  const [downPayment, setDownPayment] = useState(1600000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [processingFee, setProcessingFee] = useState(15000);
  const [insuranceEstimate, setInsuranceEstimate] = useState(25000);
  const [prepaymentAmount, setPrepaymentAmount] = useState(100000);
  const [prepaymentFrequency, setPrepaymentFrequency] = useState("annual"); // "annual" or "one_time"
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [existingEmis, setExistingEmis] = useState(15000);

  const validationError = validateNumbers({ propertyValue, downPayment, interestRate, tenure, processingFee, insuranceEstimate, prepaymentAmount, monthlyIncome, existingEmis }, ["propertyValue", "tenure", "monthlyIncome"], ["interestRate"])
    || (downPayment > propertyValue ? "Down payment cannot exceed property value." : undefined)
    || (tenure > 50 || !Number.isInteger(tenure * 12) ? "Enter a term of up to 50 years in whole months." : undefined);
  const loanAmount = Math.max(0, propertyValue - downPayment);
  const numberOfMonths = Math.round(tenure * 12);
  const emi = monthlyPayment(loanAmount, interestRate, numberOfMonths);
  const totalRepayment = emi * numberOfMonths;
  const totalInterest = Math.max(0, totalRepayment - loanAmount);
  const ltv = propertyValue > 0 ? loanAmount / propertyValue * 100 : 0;
  const emiToIncome = monthlyIncome > 0 ? (emi + existingEmis) / monthlyIncome * 100 : 0;
  const { interestSaved, monthsReduced } = prepaymentImpact(loanAmount, interestRate, numberOfMonths, prepaymentAmount, prepaymentFrequency);
  const suggestedMaxEmi = Math.max(0, monthlyIncome * 0.4 - existingEmis);

  // Build Markdown summary for Copy Summary action
  const summaryMarkdown = `### Home Loan EMI Detailed Projections
*   **Property Value**: ${formatINR(propertyValue)}
*   **Down Payment**: ${formatINR(downPayment)}
*   **Loan Amount**: ${formatINR(loanAmount)} (LTV: ${ltv.toFixed(1)}%)
*   **Interest Rate / Tenure**: ${interestRate}% for ${tenure} years
*   **Monthly EMI**: ${formatINR(Math.round(emi))}
*   **EMI-to-Income Ratio**: ${emiToIncome.toFixed(1)}% (Limit: 40%)
*   **Total Interest Payable**: ${formatINR(Math.round(totalInterest))}
*   **Prepayment Savings (fixed-rate schedule)**: ${formatINR(Math.round(interestSaved))} (Tenure reduced by ~${monthsReduced} months)
*   **Suggested Max EMI**: ${formatINR(Math.round(suggestedMaxEmi))}
*   *Note: Planning estimates only. Confirm eligibility with lenders.*`;

  const inputs = (
    <div className="space-y-6 text-xs text-slate-700 font-sans">
      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Loan Parameters
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="homeloanemidetailedcalculator-field-1">Property Value (INR)</label>
          <input id="homeloanemidetailedcalculator-field-1"
            type="number" min="0"
            value={propertyValue}
            onChange={(e) => setPropertyValue(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="homeloanemidetailedcalculator-field-2">Down Payment (INR)</label>
          <input id="homeloanemidetailedcalculator-field-2"
            type="number" min="0"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="homeloanemidetailedcalculator-field-3">Interest Rate (% p.a.)</label>
          <input id="homeloanemidetailedcalculator-field-3"
            type="number" min="0"
            step="0.05"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="homeloanemidetailedcalculator-field-4">Tenure (Years)</label>
          <input id="homeloanemidetailedcalculator-field-4"
            type="number" min="0"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100 pt-2">
        Prepayment & Affordability Inputs
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="homeloanemidetailedcalculator-field-5">Prepayment Amount (INR)</label>
          <input id="homeloanemidetailedcalculator-field-5"
            type="number" min="0"
            value={prepaymentAmount}
            onChange={(e) => setPrepaymentAmount(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="homeloanemidetailedcalculator-field-6">Prepayment Frequency</label>
          <select id="homeloanemidetailedcalculator-field-6"
            value={prepaymentFrequency}
            onChange={(e) => setPrepaymentFrequency(e.target.value)}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          >
            <option value="annual">Annual Recurring</option>
            <option value="one_time">One-time Bullet</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="homeloanemidetailedcalculator-field-7">Monthly Take-Home Income (INR)</label>
          <input id="homeloanemidetailedcalculator-field-7"
            type="number" min="0"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="homeloanemidetailedcalculator-field-8">Existing Monthly EMIs (INR)</label>
          <input id="homeloanemidetailedcalculator-field-8"
            type="number" min="0"
            value={existingEmis}
            onChange={(e) => setExistingEmis(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="homeloanemidetailedcalculator-field-9">Processing Fees (INR)</label>
          <input id="homeloanemidetailedcalculator-field-9"
            type="number" min="0"
            value={processingFee}
            onChange={(e) => setProcessingFee(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3.5 py-1.5 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="homeloanemidetailedcalculator-field-10">Property Insurance Est (INR)</label>
          <input id="homeloanemidetailedcalculator-field-10"
            type="number" min="0"
            value={insuranceEstimate}
            onChange={(e) => setInsuranceEstimate(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3.5 py-1.5 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-xs font-sans">
      <div className="border-b border-[#1d3e30] pb-4">
        <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block mb-1">Monthly Commitment</span>
        <div className="text-4xl font-sans font-bold text-white tracking-tight">
          {formatINR(Math.round(emi))}
          <span className="text-xs text-slate-300 font-sans font-medium block mt-1">Estimated Monthly EMI</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <span className="text-slate-300 block font-medium">Loan Required</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(loanAmount)}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Loan-to-Value (LTV)</span>
          <span className={`text-sm font-bold block mt-0.5 ${ltv > 80 ? "text-amber-400" : "text-white"}`}>
            {ltv.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-[#1d3e30] pt-4">
        <div>
          <span className="text-slate-300 block font-medium">Total Interest Payable</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(totalInterest))}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Total Repayment</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(totalRepayment))}</span>
        </div>
      </div>

      <div className="border-t border-[#1d3e30] pt-4 space-y-2">
        <div className="flex justify-between font-medium">
          <span className="text-slate-300">FOIR / Debt-to-Income:</span>
          <span className={`font-bold ${emiToIncome > 50 ? "text-rose-400" : emiToIncome > 40 ? "text-amber-400" : "text-emerald-400"}`}>
            {emiToIncome.toFixed(1)}%
          </span>
        </div>
        <div className="flex justify-between font-medium">
          <span className="text-slate-300">Suggested Max EMI:</span>
          <span className="text-white font-bold">{formatINR(Math.round(suggestedMaxEmi))}</span>
        </div>
      </div>

      {interestSaved > 0 && (
        <div className="bg-[#143125] p-3 rounded border border-emerald-500/20 text-emerald-400 font-medium space-y-1">
          <span className="text-[9px] uppercase font-bold tracking-wider block">Prepayment Savings Simulation</span>
          <p className="text-[11px] leading-relaxed">
            Prepaying {formatINR(prepaymentAmount)} ({prepaymentFrequency.replace("_", " ")}) saves an estimated <strong>{formatINR(Math.round(interestSaved))}</strong> in interest and shortens your tenure by <strong>{monthsReduced} months</strong>.
          </p>
        </div>
      )}
    </div>
  );

  const explanation = (
    <div className="space-y-6 text-xs text-slate-600 font-sans leading-relaxed">
      <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Planning Insights & Bank Discussion Checklist
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Understanding your Projections</h4>
          <p>
            The loan-to-value (LTV) ratio determines the percentage of property cost financed by lenders. RBI guidelines typically limit LTV to 80% for loans above 30 Lakhs, and 75% for loans above 75 Lakhs.
          </p>
          <p>
            Your FOIR (Financial Obligation to Income Ratio) should ideally remain below 40% of your net income to qualify for competitive interest rates.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Discussion Checklist for Banks</h4>
          <ul className="list-disc pl-4 space-y-1.5 font-medium text-slate-700">
            <li>Ask if the rate is linked to RBI repo rate (EBLR).</li>
            <li>Confirm check processing fees and legal title search charges.</li>
            <li>Confirm there are zero prepayment charges on floating-rate loans.</li>
            <li>Ask about hybrid schemes (such as SBI Maxgain or Bank overdraft accounts).</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      validationError={validationError}
      title="Home Loan EMI Calculator"
      subtitle="Analyze monthly outflows, interest splits, prepayment benefits, and debt-to-income limits."
      category="Buyer Planning"
      inputs={inputs}
      results={results}
      explanation={explanation}
      actionBar={
        <CalculatorActionBar
          calculatorName="Home Loan EMI Detailed Planner"
          summaryMarkdown={summaryMarkdown}
        />
      }
    />
  );
};
