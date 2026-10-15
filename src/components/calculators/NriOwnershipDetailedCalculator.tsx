"use client";

import React, { useState } from "react";
import { monthlyPayment, validateNumbers } from "@/lib/calculators/financialMath";
import { formatINR } from "@/lib/utils";
import { CalculatorShell } from "./CalculatorShell";
import { CalculatorActionBar } from "./CalculatorActionBar";

export const NriOwnershipDetailedCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(15000000);
  const [currency, setCurrency] = useState("USD");
  const [fxRate, setFxRate] = useState(83.5);
  const [loanPercentage, setLoanPercentage] = useState(70);
  const [interestRate, setInterestRate] = useState(8.75); // NRI loan rates are usually slightly higher
  const [tenure, setTenure] = useState(15); // Editable planning assumption; lender terms vary.
  
  // Expenses
  const [annualMaintenance, setAnnualMaintenance] = useState(72000);
  const [annualTax, setAnnualTax] = useState(15000);
  const [propertyManagementCost, setPropertyManagementCost] = useState(36000);
  const [expectedRent, setExpectedRent] = useState(55000);
  const [vacancyRate, setVacancyRate] = useState(8); // %
  const [annualTravelCost, setAnnualTravelCost] = useState(120000); // travel to site visits
  const [annualRepairReserve, setAnnualRepairReserve] = useState(25000);

  const loanAmount = propertyPrice * (loanPercentage / 100);
  const equityRequired = propertyPrice - loanAmount;

  const validationError = validateNumbers({ propertyPrice, fxRate, loanPercentage, interestRate, tenure, annualMaintenance, annualTax, propertyManagementCost, expectedRent, vacancyRate, annualTravelCost, annualRepairReserve }, ["propertyPrice", "fxRate", "tenure"], ["loanPercentage", "interestRate", "vacancyRate"])
    || (tenure > 50 || !Number.isInteger(tenure * 12) ? "Enter a term of up to 50 years in whole months." : undefined);
  const emi = monthlyPayment(loanAmount, interestRate, tenure * 12);

  const annualLoanRepayment = emi * 12;
  const annualRentalIncome = expectedRent * 12 * (1 - vacancyRate / 100);
  
  const annualHoldingExpenses = annualMaintenance + annualTax + propertyManagementCost + annualTravelCost + annualRepairReserve;
  const totalAnnualOutflow = annualLoanRepayment + annualHoldingExpenses;
  const netAnnualOutflow = totalAnnualOutflow - annualRentalIncome;

  const monthlyOutflowINR = netAnnualOutflow / 12;
  const monthlyOutflowFx = fxRate > 0 ? monthlyOutflowINR / fxRate : 0;

  // NRI Readiness score
  let readinessScore = 80;
  if (loanPercentage > 75) readinessScore -= 15;
  if (propertyManagementCost === 0) readinessScore -= 20; // Needs manager if NRI
  if (netAnnualOutflow > 500000) readinessScore -= 10;
  readinessScore = Math.max(10, Math.min(100, readinessScore));

  const summaryMarkdown = `### NRI Property Ownership Projections
*   **Property Price**: ${formatINR(propertyPrice)}
*   **Loan Funding Ratio (${loanPercentage}%)**: ${formatINR(loanAmount)}
*   **EMI Outflow**: ${formatINR(Math.round(emi))} / month
*   **Annual Outflow (Loan + Maintenance)**: ${formatINR(totalAnnualOutflow)}
*   **Net Annual Outflow (negative means surplus)**: ${formatINR(netAnnualOutflow)}
*   **Monthly Outflow (${currency})**: ${currency} ${monthlyOutflowFx.toFixed(2)}
*   **NRI Management Readiness Score**: ${readinessScore}/100
*   *Note: Projections only. FX is an undated user assumption, not a live quote. Negative outflow means surplus. Legal purchase eligibility needs separate review.*`;

  const inputs = (
    <div className="space-y-6 text-xs text-slate-700 font-sans">
      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Capital & FX Inputs
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-1">Property Value (INR)</label>
          <input id="nriownershipdetailedcalculator-field-1"
            type="number" min="0"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-2">Loan Ratio (%)</label>
          <input id="nriownershipdetailedcalculator-field-2"
            type="number" min="0"
            value={loanPercentage}
            onChange={(e) => setLoanPercentage(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-3">Forex Currency</label>
          <select id="nriownershipdetailedcalculator-field-3"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          >
            <option value="USD">USD ($)</option>
            <option value="GBP">GBP (£)</option>
            <option value="AED">AED (Dh)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-4">FX Conversion Rate</label>
          <input id="nriownershipdetailedcalculator-field-4"
            type="number" min="0"
            step="0.01"
            value={fxRate}
            onChange={(e) => setFxRate(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-5">Loan Interest (%)</label>
          <input id="nriownershipdetailedcalculator-field-5"
            type="number" min="0"
            step="0.05"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100 pt-2">
        Advisory & Holding Expenses
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-6">Annual Maintenance</label>
          <input id="nriownershipdetailedcalculator-field-6"
            type="number" min="0"
            value={annualMaintenance}
            onChange={(e) => setAnnualMaintenance(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-7">Property Tax (Annual)</label>
          <input id="nriownershipdetailedcalculator-field-7"
            type="number" min="0"
            value={annualTax}
            onChange={(e) => setAnnualTax(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-8">Management Retainer</label>
          <input id="nriownershipdetailedcalculator-field-8"
            type="number" min="0"
            value={propertyManagementCost}
            onChange={(e) => setPropertyManagementCost(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-9">Expected Rent (Monthly)</label>
          <input id="nriownershipdetailedcalculator-field-9"
            type="number" min="0"
            value={expectedRent}
            onChange={(e) => setExpectedRent(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-10">Vacancy factor (%)</label>
          <input id="nriownershipdetailedcalculator-field-10"
            type="number" min="0"
            value={vacancyRate}
            onChange={(e) => setVacancyRate(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="nriownershipdetailedcalculator-field-11">Annual Travel Cost</label>
          <input id="nriownershipdetailedcalculator-field-11"
            type="number" min="0"
            value={annualTravelCost}
            onChange={(e) => setAnnualTravelCost(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-xs font-sans">
      <div className="border-b border-[#1d3e30] pb-4">
        <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block mb-1">Net Monthly Outflow</span>
        <div className="text-4xl font-sans font-bold text-white tracking-tight">
          {currency} {monthlyOutflowFx.toFixed(2)}
          <span className="text-xs text-slate-300 font-sans font-medium block mt-1">
            ~ {formatINR(Math.round(monthlyOutflowINR))} / month
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <span className="text-slate-300 block font-medium">Monthly Loan EMI</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(emi))}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Annual Rental Offset</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(annualRentalIncome))}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-[#1d3e30] pt-4">
        <div>
          <span className="text-slate-300 block font-medium">Annual Outflow Total</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(totalAnnualOutflow))}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Readiness Score</span>
          <span className={`text-sm font-bold block mt-0.5 ${readinessScore >= 80 ? "text-emerald-400" : "text-amber-400"}`}>
            {readinessScore}/100
          </span>
        </div>
      </div>
    </div>
  );

  const explanation = (
    <div className="space-y-6 text-xs text-slate-600 font-sans leading-relaxed">
      <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">
        NRI Ownership Guidelines & FEMA Compliance Checklist
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">FEMA Guidelines for NRI Property</h4>
          <p>
            Under FEMA rules, NRIs can freely acquire residential and commercial properties in India. However, they cannot purchase agricultural land, plantation properties, or farmhouses without specific RBI approvals.
          </p>
          <p>
            All capital transfers for down-payment must route through NRE/NRO banking channels. Rental income is repatriable, subject to income tax filing in India.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Required Documents Checklist</h4>
          <ul className="list-disc pl-4 space-y-1.5 font-medium text-slate-700">
            <li>Valid Indian Passport or OCI/PIO card.</li>
            <li>PAN Card (Mandatory for property registrations).</li>
            <li>Power of Attorney (POA) if registering via local representative.</li>
            <li>Tax Residency Certificate (TRC) to verify double tax avoidance agreement (DTAA).</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      validationError={validationError}
      title="NRI Property Ownership Planner"
      subtitle="Map forex conversion rates, holding costs, tax adjustments, and local property management fees."
      category="NRI & Rental Yield"
      inputs={inputs}
      results={results}
      explanation={explanation}
      actionBar={
        <CalculatorActionBar
          calculatorName="NRI Property Ownership Detailed Planner"
          summaryMarkdown={summaryMarkdown}
        />
      }
    />
  );
};
