"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";

export const NriOwnershipCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(15000000);
  const [loanPercentage, setLoanPercentage] = useState(70);
  const [annualMaintenance, setAnnualMaintenance] = useState(72000);
  const [annualTax, setAnnualTax] = useState(15000);
  const [propertyManagementCost, setPropertyManagementCost] = useState(36000); // Property manager retainer
  const [monthlyRent, setMonthlyRent] = useState(55000);
  const [usdRate, setUsdRate] = useState(83.5); // Current baseline exchange rate

  const loanAmount = propertyPrice * (loanPercentage / 100);
  const equityRequired = propertyPrice - loanAmount;

  // Let's assume standard EMI calculation parameters: 8.5% interest, 15 years tenure for NRIs (NRIs typically get shorter tenure)
  const interestRate = 8.5;
  const tenure = 15;
  const r = interestRate / 12 / 100;
  const n = tenure * 12;

  let emi = 0;
  if (r > 0) {
    emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else {
    emi = loanAmount / n;
  }

  const annualLoanRepayment = emi * 12;
  const totalAnnualOutflow = annualLoanRepayment + annualMaintenance + annualTax + propertyManagementCost;
  const annualRentalIncome = monthlyRent * 11; // Assuming 1 month vacancy average
  const netAnnualCost = totalAnnualOutflow - annualRentalIncome;

  const monthlyOutflowInUSD = (netAnnualCost / 12) / usdRate;

  return (
    <div className="p-6 bg-white border border-gold-elegant rounded font-sans space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div>
          <h4 className="font-serif text-base font-bold text-[#10291f]">NRI Property Ownership Planner</h4>
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Forex Cash Flow Mapping</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#10291f] font-bold text-[10px] uppercase mb-1">Property Value (INR)</label>
              <input 
                type="number" 
                value={propertyPrice} 
                onChange={(e) => setPropertyPrice(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#10291f] font-bold text-[10px] uppercase mb-1">Loan Funding Ratio (%)</label>
              <input 
                type="number" 
                value={loanPercentage} 
                onChange={(e) => setLoanPercentage(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Maintenance / Yr</label>
              <input 
                type="number" 
                value={annualMaintenance} 
                onChange={(e) => setAnnualMaintenance(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Mngmt Cost / Yr</label>
              <input 
                type="number" 
                value={propertyManagementCost} 
                onChange={(e) => setPropertyManagementCost(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Forex USD Rate</label>
              <input 
                type="number" 
                step="0.1"
                value={usdRate} 
                onChange={(e) => setUsdRate(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1.5 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Expected Rent / Month (INR)</label>
            <input 
              type="number" 
              value={monthlyRent} 
              onChange={(e) => setMonthlyRent(Number(e.target.value))} 
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Equity Capital Needed:</span>
            <span className="text-[#10291f] font-bold">{formatINR(equityRequired)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Monthly Home Loan EMI:</span>
            <span className="text-[#10291f] font-bold">{formatINR(Math.round(emi))}</span>
          </div>
          <div className="flex justify-between font-medium bg-[#10291f]/5 -mx-6 p-4">
            <span className="text-slate-500 font-bold">Net Outflow / Month (USD):</span>
            <span className="text-[#10291f] font-bold">${Math.round(monthlyOutflowInUSD)} / Month</span>
          </div>
        </div>

        <Link href="/project-enquiry?interestType=nri_advisory" className="block text-center">
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-[#10291f] font-bold text-[10px] uppercase border border-gold-elegant rounded transition-colors duration-200">
            Request MS Legacy Advisory Review
          </button>
        </Link>

        <p className="text-[9px] text-slate-400 leading-relaxed">
          <strong>Advisory Notice:</strong> Estimates only. Forex variations, NRE accounts, and local tax compliance may affect actual costs. Verify with tax consultants. MS Legacy provides planning support, not guaranteed outcomes.
        </p>
      </div>
    </div>
  );
};
