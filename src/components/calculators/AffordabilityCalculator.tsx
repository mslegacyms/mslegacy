"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";

export const AffordabilityCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [existingObligations, setExistingObligations] = useState(20000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [emiRatio, setEmiRatio] = useState(40);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const availableEmi = (monthlyIncome * (emiRatio / 100)) - existingObligations;
  const maxEmi = availableEmi > 0 ? availableEmi : 0;

  const r = interestRate / 12 / 100;
  const n = tenure * 12;

  let affordableLoan = 0;
  if (r > 0) {
    affordableLoan = (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  } else {
    affordableLoan = maxEmi * n;
  }

  const affordableBudget = affordableLoan + downPayment;

  return (
    <div className="p-6 bg-white border border-gold-elegant rounded font-sans space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div>
          <h4 className="font-serif text-base font-bold text-[#10291f]">Budget Affordability Desk</h4>
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Determine Safe Buying Power</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="affordabilitycalculator-field-1">Monthly Income (INR)</label>
              <input id="affordabilitycalculator-field-1"
                type="number" min="0"
                value={monthlyIncome} 
                onChange={(e) => setMonthlyIncome(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="affordabilitycalculator-field-2">Down Payment (INR)</label>
              <input id="affordabilitycalculator-field-2"
                type="number" min="0"
                value={downPayment} 
                onChange={(e) => setDownPayment(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="affordabilitycalculator-field-3">Existing Monthly EMIs</label>
              <input id="affordabilitycalculator-field-3"
                type="number" min="0"
                value={existingObligations} 
                onChange={(e) => setExistingObligations(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="affordabilitycalculator-field-4">Preferred EMI Ratio (%)</label>
              <input id="affordabilitycalculator-field-4"
                type="number" min="0"
                value={emiRatio} 
                onChange={(e) => setEmiRatio(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Available Monthly EMI Cap:</span>
            <span className="text-[#10291f] font-bold">{formatINR(Math.round(maxEmi))}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Affordable Loan Capacity:</span>
            <span className="text-[#10291f] font-bold">{formatINR(Math.round(affordableLoan))}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Estimated Total Budget:</span>
            <span className="text-[#10291f] font-bold text-sm">{formatINR(Math.round(affordableBudget))}</span>
          </div>
        </div>

        <Link href="/project-enquiry?interestType=general_advisory" className="block text-center">
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-[#10291f] font-bold text-[10px] uppercase border border-gold-elegant rounded transition-colors duration-200">
            Request MS Legacy Advisory Review
          </button>
        </Link>

        <p className="text-[9px] text-slate-400 leading-relaxed">
          <strong>Advisory Notice:</strong> Estimates only. Not financial advice. Figures may vary. Verify with banks, credit bureaus, or legal advisors. MS Legacy provides advisory support, not guaranteed outcomes.
        </p>
      </div>
    </div>
  );
};
