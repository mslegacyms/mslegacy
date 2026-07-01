"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";

export const PlotCostCalculator = () => {
  const [plotSize, setPlotSize] = useState(1200); // 30x40 site
  const [ratePerSqFt, setRatePerSqFt] = useState(4500);
  const [developmentCharges, setDevelopmentCharges] = useState(150000);
  const [legalCost, setLegalCost] = useState(35000);

  const rawCost = plotSize * ratePerSqFt;
  const registrationEstimate = rawCost * 0.06; // Karnataka 6% registration stamp average
  const totalCost = rawCost + developmentCharges + registrationEstimate + legalCost;

  return (
    <div className="p-6 bg-white border border-gold-elegant rounded font-sans space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div>
          <h4 className="font-serif text-base font-bold text-[#10291f]">Land / Plot Cost Calculator</h4>
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Acreage & Site Cost Planner</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Plot Area (Sq.Ft)</label>
              <input 
                type="number" 
                value={plotSize} 
                onChange={(e) => setPlotSize(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Rate per Sq.Ft (INR)</label>
              <input 
                type="number" 
                value={ratePerSqFt} 
                onChange={(e) => setRatePerSqFt(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Infrastructure Charges</label>
              <input 
                type="number" 
                value={developmentCharges} 
                onChange={(e) => setDevelopmentCharges(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Title Audit Desk Fee</label>
              <input 
                type="number" 
                value={legalCost} 
                onChange={(e) => setLegalCost(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Raw Site Value:</span>
            <span className="text-[#10291f] font-bold">{formatINR(rawCost)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Estimated Registration (6%):</span>
            <span className="text-[#10291f] font-bold">{formatINR(Math.round(registrationEstimate))}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Total Acquisition Cost:</span>
            <span className="text-[#10291f] font-bold text-sm">{formatINR(Math.round(totalCost))}</span>
          </div>
        </div>

        <Link href="/project-enquiry?interestType=plot_enquiry" className="block text-center">
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-[#10291f] font-bold text-[10px] uppercase border border-gold-elegant rounded transition-colors duration-200">
            Request MS Legacy Advisory Review
          </button>
        </Link>

        <p className="text-[9px] text-slate-400 leading-relaxed">
          <strong>Advisory Notice:</strong> Estimates only. Siting development, local mutation rules, and layout registration costs vary. Verify with developers or legal panels. MS Legacy provides planning support, not guaranteed outcomes.
        </p>
      </div>
    </div>
  );
};
