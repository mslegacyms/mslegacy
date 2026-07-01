"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";

export const StampDutyCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(6000000);
  const [stampDutyRate, setStampDutyRate] = useState(5.6); // Default editable planning assumption
  const [registrationRate, setRegistrationRate] = useState(1.0); // Default editable planning assumption
  const [otherCharges, setOtherCharges] = useState(50000); // Default editable planning assumption

  const stampDuty = propertyValue * (stampDutyRate / 100);
  const registrationCost = propertyValue * (registrationRate / 100);
  const totalCost = propertyValue + stampDuty + registrationCost + otherCharges;

  return (
    <div className="p-6 bg-white border border-gold-elegant rounded font-sans space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div>
          <h4 className="font-serif text-base font-bold text-[#10291f]">Stamp Duty & Registration Calculator</h4>
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Government Charges Estimation</span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Property Value (INR)</label>
            <input 
              type="number" 
              value={propertyValue} 
              onChange={(e) => setPropertyValue(Number(e.target.value))} 
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Stamp Duty (%) *</label>
              <input 
                type="number" 
                step="0.01"
                value={stampDutyRate} 
                onChange={(e) => setStampDutyRate(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
              <span className="text-[8px] text-slate-400 font-semibold block mt-0.5">* Editable Planning Assumption</span>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Registration (%) *</label>
              <input 
                type="number" 
                step="0.01"
                value={registrationRate} 
                onChange={(e) => setRegistrationRate(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
              <span className="text-[8px] text-slate-400 font-semibold block mt-0.5">* Editable Planning Assumption</span>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Other Charges (INR) *</label>
            <input 
              type="number" 
              value={otherCharges} 
              onChange={(e) => setOtherCharges(Number(e.target.value))} 
              className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
            />
            <span className="text-[8px] text-slate-400 font-semibold block mt-0.5">* Editable Planning Assumption</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Estimated Stamp Duty:</span>
            <span className="text-[#10291f] font-bold">{formatINR(Math.round(stampDuty))}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Estimated Registration Fee:</span>
            <span className="text-[#10291f] font-bold">{formatINR(Math.round(registrationCost))}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Total Transaction Cost:</span>
            <span className="text-[#10291f] font-bold text-sm">{formatINR(Math.round(totalCost))}</span>
          </div>
        </div>

        <Link href="/project-enquiry?interestType=legal_due_diligence" className="block text-center">
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-[#10291f] font-bold text-[10px] uppercase border border-gold-elegant rounded transition-colors duration-200">
            Request MS Legacy Advisory Review
          </button>
        </Link>

        <p className="text-[9px] text-slate-400 leading-relaxed">
          <strong>Advisory Notice:</strong> Estimates only. Government charges and rules may change and must be verified with the current official department, registration office, or an independent legal advisor. MS Legacy provides planning support, not guaranteed outcomes or official quotes.
        </p>
      </div>
    </div>
  );
};
