"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";

export const EmiCalculator = () => {
  const [price, setPrice] = useState(8000000);
  const [downPayment, setDownPayment] = useState(1600000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 12 / 100;
  const numberOfMonths = tenure * 12;

  let emi = 0;
  if (monthlyRate > 0) {
    emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / 
          (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  } else {
    emi = loanAmount / numberOfMonths;
  }

  const totalRepayment = emi * numberOfMonths;
  const totalInterest = totalRepayment - loanAmount;

  return (
    <div className="p-6 bg-white border border-gold-elegant rounded font-sans space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div>
          <h4 className="font-serif text-base font-bold text-[#10291f]">Home Loan EMI Calculator</h4>
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Plan Monthly Outflows</span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="emicalculator-field-1">Property Value (INR)</label>
            <input id="emicalculator-field-1"
              type="number" min="0"
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value))} 
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="emicalculator-field-2">Down Payment (INR)</label>
              <input id="emicalculator-field-2"
                type="number" min="0"
                value={downPayment} 
                onChange={(e) => setDownPayment(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="emicalculator-field-3">Interest Rate (%)</label>
              <input id="emicalculator-field-3"
                type="number" min="0"
                step="0.1"
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="emicalculator-field-4">Tenure (Years)</label>
            <input id="emicalculator-field-4"
              type="number" min="0"
              value={tenure} 
              onChange={(e) => setTenure(Number(e.target.value))} 
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Loan Amount Required:</span>
            <span className="text-[#10291f] font-bold">{formatINR(loanAmount)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Estimated Monthly EMI:</span>
            <span className="text-[#10291f] font-bold text-sm">{formatINR(Math.round(emi))}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Total Interest Payable:</span>
            <span className="text-[#10291f] font-bold">{formatINR(Math.round(totalInterest))}</span>
          </div>
        </div>

        <Link href="/project-enquiry?interestType=site_visit_support" className="block text-center">
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-[#10291f] font-bold text-[10px] uppercase border border-gold-elegant rounded transition-colors duration-200">
            Request MS Legacy Advisory Review
          </button>
        </Link>

        <p className="text-[9px] text-slate-400 leading-relaxed">
          <strong>Advisory Notice:</strong> Estimates only. Not financial or legal advice. Figures may vary. Verify with banks or financial advisors. MS Legacy provides advisory support, not guaranteed outcomes.
        </p>
      </div>
    </div>
  );
};
