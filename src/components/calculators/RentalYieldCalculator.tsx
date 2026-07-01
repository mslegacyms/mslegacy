"use client";

import React, { useState } from "react";
import Link from "next/link";

export const RentalYieldCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(12000000);
  const [monthlyRent, setMonthlyRent] = useState(45000);
  const [annualMaintenance, setAnnualMaintenance] = useState(60000);
  const [vacancyRate, setVacancyRate] = useState(5); // 5% vacancy average

  const annualGrossRent = monthlyRent * 12;
  const vacancyLoss = annualGrossRent * (vacancyRate / 100);
  const netAnnualRent = annualGrossRent - vacancyLoss - annualMaintenance;

  const grossYield = (annualGrossRent / propertyPrice) * 100;
  const netYield = propertyPrice > 0 ? (netAnnualRent / propertyPrice) * 100 : 0;

  return (
    <div className="p-6 bg-white border border-gold-elegant rounded font-sans space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div>
          <h4 className="font-serif text-base font-bold text-[#10291f]">Rental Yield Calculator</h4>
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Asset Performance Metrics</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Property Price (INR)</label>
              <input 
                type="number" 
                value={propertyPrice} 
                onChange={(e) => setPropertyPrice(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Expected Monthly Rent</label>
              <input 
                type="number" 
                value={monthlyRent} 
                onChange={(e) => setMonthlyRent(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Annual Maintenance</label>
              <input 
                type="number" 
                value={annualMaintenance} 
                onChange={(e) => setAnnualMaintenance(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Vacancy Rate (%)</label>
              <input 
                type="number" 
                value={vacancyRate} 
                onChange={(e) => setVacancyRate(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Gross Rental Yield:</span>
            <span className="text-[#10291f] font-bold text-sm">{grossYield.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Net Rental Yield:</span>
            <span className="text-[#10291f] font-bold text-sm text-[#8b6e3a]">{netYield.toFixed(2)}%</span>
          </div>
        </div>

        <Link href="/project-enquiry?interestType=property_management" className="block text-center">
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-[#10291f] font-bold text-[10px] uppercase border border-gold-elegant rounded transition-colors duration-200">
            Request MS Legacy Advisory Review
          </button>
        </Link>

        <p className="text-[9px] text-slate-400 leading-relaxed">
          <strong>Advisory Notice:</strong> Estimates only. Rental yield indicators fluctuate with local market corridors, occupancy rates, and taxes. Verify with property managers or tax advisors. MS Legacy provides planning support, not guaranteed outcomes.
        </p>
      </div>
    </div>
  );
};
