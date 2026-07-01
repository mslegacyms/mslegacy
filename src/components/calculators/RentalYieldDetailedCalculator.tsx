"use client";

import React, { useState } from "react";
import { formatINR } from "@/lib/utils";
import { CalculatorShell } from "./CalculatorShell";
import { CalculatorActionBar } from "./CalculatorActionBar";

export const RentalYieldDetailedCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(12000000);
  const [monthlyRent, setMonthlyRent] = useState(45000);
  const [deposit, setDeposit] = useState(250000);
  const [maintenanceCharges, setMaintenanceCharges] = useState(5000); // monthly
  const [propertyTax, setPropertyTax] = useState(12000); // annual
  const [insurance, setInsurance] = useState(8000); // annual
  const [vacancyRate, setVacancyRate] = useState(5); // %
  const [brokerageLeasing, setBrokerageLeasing] = useState(45000); // annual lease fee
  const [repairReserve, setRepairReserve] = useState(20000); // annual
  const [loanEmi, setLoanEmi] = useState(35000); // monthly
  const [propertyManagementFeePercent, setPropertyManagementFeePercent] = useState(8); // % of monthly rent
  const [appreciationAssumption, setAppreciationAssumption] = useState(5); // % annual appreciation

  const annualGrossRent = monthlyRent * 12;
  const vacancyLoss = annualGrossRent * (vacancyRate / 100);
  const propertyManagementFee = annualGrossRent * (propertyManagementFeePercent / 100);
  const totalAnnualMaintenance = maintenanceCharges * 12;

  const totalAnnualExpenses = propertyTax + insurance + totalAnnualMaintenance + propertyManagementFee + brokerageLeasing + repairReserve;
  const netOperatingIncome = annualGrossRent - vacancyLoss - totalAnnualExpenses;

  const grossYield = (annualGrossRent / propertyPrice) * 100;
  const netYield = propertyPrice > 0 ? (netOperatingIncome / propertyPrice) * 100 : 0;

  const annualEmiCost = loanEmi * 12;
  const netCashFlowAfterEmi = netOperatingIncome - annualEmiCost;

  // Investment Quality Score
  let qualityScore = 50;
  if (netYield >= 4.5) qualityScore += 20;
  else if (netYield >= 3.0) qualityScore += 10;
  if (netCashFlowAfterEmi > 0) qualityScore += 20;
  if (appreciationAssumption >= 6) qualityScore += 10;
  qualityScore = Math.max(10, Math.min(100, qualityScore));

  const summaryMarkdown = `### Rental Yield Detailed Projections
*   **Property Price**: ${formatINR(propertyPrice)}
*   **Expected Rent (Monthly)**: ${formatINR(monthlyRent)}
*   **Annual Gross Rent**: ${formatINR(annualGrossRent)}
*   **Vacancy Loss Est. (${vacancyRate}%)**: ${formatINR(vacancyLoss)}
*   **Annual Expenses Total**: ${formatINR(totalAnnualExpenses)}
*   **Net Operating Income (NOI)**: ${formatINR(netOperatingIncome)}
*   **Gross Rental Yield**: ${grossYield.toFixed(2)}%
*   **Net Rental Yield**: ${netYield.toFixed(2)}%
*   **Annual Cash Flow (after EMIs)**: ${formatINR(netCashFlowAfterEmi)}
*   **Investment Quality Score**: ${qualityScore}/100
*   *Note: Projections only. Yields and cash flows fluctuate and are not guaranteed.*`;

  const inputs = (
    <div className="space-y-6 text-xs text-slate-700 font-sans">
      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Acquisition & Rent
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Property Price (INR)</label>
          <input
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Expected Monthly Rent (INR)</label>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tenant Deposit (INR)</label>
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Vacancy Rate (%)</label>
          <input
            type="number"
            value={vacancyRate}
            onChange={(e) => setVacancyRate(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Appreciation Est. (%/yr)</label>
          <input
            type="number"
            value={appreciationAssumption}
            onChange={(e) => setAppreciationAssumption(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100 pt-2">
        Outgoings & Expenses (Annualized)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Maintenance (Monthly)</label>
          <input
            type="number"
            value={maintenanceCharges}
            onChange={(e) => setMaintenanceCharges(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Property Tax (Annual)</label>
          <input
            type="number"
            value={propertyTax}
            onChange={(e) => setPropertyTax(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Insurance (Annual)</label>
          <input
            type="number"
            value={insurance}
            onChange={(e) => setInsurance(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Brokerage / Leasing (Annual)</label>
          <input
            type="number"
            value={brokerageLeasing}
            onChange={(e) => setBrokerageLeasing(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Repair Reserve (Annual)</label>
          <input
            type="number"
            value={repairReserve}
            onChange={(e) => setRepairReserve(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Management Fee (%)</label>
          <input
            type="number"
            value={propertyManagementFeePercent}
            onChange={(e) => setPropertyManagementFeePercent(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Monthly Home Loan EMI (If any)</label>
          <input
            type="number"
            value={loanEmi}
            onChange={(e) => setLoanEmi(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3.5 py-1.5 text-[#10291f] font-semibold"
          />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-xs font-sans">
      <div className="border-b border-[#1d3e30] pb-4">
        <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block mb-1">Net Performance</span>
        <div className="text-4xl font-sans font-bold text-white tracking-tight">
          {netYield.toFixed(2)}%
          <span className="text-xs text-slate-300 font-sans font-medium block mt-1">Net Rental Yield (NOI / Price)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <span className="text-slate-300 block font-medium">Gross Rental Yield</span>
          <span className="text-sm font-bold text-white block mt-0.5">{grossYield.toFixed(2)}%</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Annual Gross Rent</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(annualGrossRent)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-[#1d3e30] pt-4">
        <div>
          <span className="text-slate-300 block font-medium">Net Operating Income (NOI)</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(netOperatingIncome))}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Cash Flow after EMI</span>
          <span className={`text-sm font-bold block mt-0.5 ${netCashFlowAfterEmi >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {formatINR(Math.round(netCashFlowAfterEmi))}
          </span>
        </div>
      </div>

      <div className="border-t border-[#1d3e30] pt-4 space-y-2">
        <div className="flex justify-between font-medium">
          <span className="text-slate-300">Investment Quality Score:</span>
          <span className={`font-bold ${qualityScore >= 70 ? "text-emerald-400" : qualityScore >= 50 ? "text-amber-400" : "text-rose-400"}`}>
            {qualityScore}/100
          </span>
        </div>
      </div>

      <div className="bg-[#143125] p-3 rounded border border-emerald-500/20 text-emerald-300 font-medium text-[11px] leading-relaxed">
        <span className="text-[9px] uppercase font-bold tracking-wider block text-emerald-400">Yield Notice</span>
        Planning scenario only — rental appreciation and vacancy parameters are not guaranteed and vary widely by micro-market.
      </div>
    </div>
  );

  const explanation = (
    <div className="space-y-6 text-xs text-slate-600 font-sans leading-relaxed">
      <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Planning Insights & Yield Parameters
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Gross vs Net Yields</h4>
          <p>
            Gross Rental Yield is a simple ratio based solely on purchase cost and gross rent. It ignores vacancies, property taxes, maintenance fees, and capital leaks.
          </p>
          <p>
            Net Rental Yield reflects actual performance by subtracting all holding costs. In Indian metro cities, residential yields typically hover between 2.5% and 3.8%, whereas commercial yields range from 7% to 9%.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Next Steps Checklist</h4>
          <ul className="list-disc pl-4 space-y-1.5 font-medium text-slate-700">
            <li>Verify local society maintenance charges (usually charged per sq.ft).</li>
            <li>Factor in stamp duty and registration expenses into the property cost denominator.</li>
            <li>Check historical vacancy durations for comparable apartments in the locality.</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="Rental Yield Planner"
      subtitle="Analyze gross and net rental yields, vacancy losses, maintenance costs, and cash flow margins."
      category="NRI & Rental Yield"
      inputs={inputs}
      results={results}
      explanation={explanation}
      actionBar={
        <CalculatorActionBar
          calculatorName="Rental Yield Detailed Planner"
          summaryMarkdown={summaryMarkdown}
        />
      }
    />
  );
};
