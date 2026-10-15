"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";

export const ConstructionCostCalculator = () => {
  const [builtUpArea, setBuiltUpArea] = useState(2000);
  const [ratePerSqFt, setRatePerSqFt] = useState(2200); // Standard construction rate
  const [interiorsCost, setInteriorsCost] = useState(500000);
  const [contingencyPercentage, setContingencyPercentage] = useState(5);

  const baseConstruction = builtUpArea * ratePerSqFt;
  const contingencyAmount = baseConstruction * (contingencyPercentage / 100);
  const totalCost = baseConstruction + interiorsCost + contingencyAmount;

  return (
    <div className="p-6 bg-white border border-gold-elegant rounded font-sans space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div>
          <h4 className="font-serif text-base font-bold text-[#10291f]">Construction Cost Calculator</h4>
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Civil Construction Cost Planner</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="constructioncostcalculator-field-1">Built-up Area (Sq.Ft)</label>
              <input id="constructioncostcalculator-field-1"
                type="number" min="0"
                value={builtUpArea} 
                onChange={(e) => setBuiltUpArea(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="constructioncostcalculator-field-2">Rate per Sq.Ft (INR)</label>
              <input id="constructioncostcalculator-field-2"
                type="number" min="0"
                value={ratePerSqFt} 
                onChange={(e) => setRatePerSqFt(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="constructioncostcalculator-field-3">Interiors Budget (INR)</label>
              <input id="constructioncostcalculator-field-3"
                type="number" min="0"
                value={interiorsCost} 
                onChange={(e) => setInteriorsCost(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="constructioncostcalculator-field-4">Contingency Rate (%)</label>
              <input id="constructioncostcalculator-field-4"
                type="number" min="0"
                value={contingencyPercentage} 
                onChange={(e) => setContingencyPercentage(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Civil Base Cost:</span>
            <span className="text-[#10291f] font-bold">{formatINR(baseConstruction)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Contingency Reserve:</span>
            <span className="text-[#10291f] font-bold">{formatINR(Math.round(contingencyAmount))}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Total Construction Budget:</span>
            <span className="text-[#10291f] font-bold text-sm">{formatINR(Math.round(totalCost))}</span>
          </div>
        </div>

        <Link href="/project-enquiry?interestType=construction_support" className="block text-center">
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-[#10291f] font-bold text-[10px] uppercase border border-gold-elegant rounded transition-colors duration-200">
            Request MS Legacy Advisory Review
          </button>
        </Link>

        <p className="text-[9px] text-slate-400 leading-relaxed">
          <strong>Advisory Notice:</strong> Estimates only. Actual construction prices, contractor agreements, and interior finishes may vary. Verify with developers or engineers. MS Legacy provides planning support, not guaranteed outcomes.
        </p>
      </div>
    </div>
  );
};
