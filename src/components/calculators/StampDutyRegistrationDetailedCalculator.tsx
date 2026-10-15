"use client";

import React, { useState } from "react";
import { formatINR } from "@/lib/utils";
import { CalculatorShell } from "./CalculatorShell";
import { CalculatorActionBar } from "./CalculatorActionBar";

export const StampDutyRegistrationDetailedCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(8000000);
  const [guidanceValue, setGuidanceValue] = useState(6000000);
  const [buyerType, setBuyerType] = useState("male"); // male, female, joint, corporate
  const [propertyType, setPropertyType] = useState("apartment"); // apartment, plot, villa
  const [locationState, setLocationState] = useState("bbmp"); // bbmp, bmrda, dtcp_gp
  
  // Editable Planning Assumptions
  const [stampDutyPercent, setStampDutyPercent] = useState(5.0);
  const [registrationPercent, setRegistrationPercent] = useState(1.0);
  const [cessPercent, setCessPercent] = useState(10.0); // cess is usually % of stamp duty
  const [legalDocCost, setLegalDocCost] = useState(45000);
  const [khataCost, setKhataCost] = useState(15000);
  const [brokerageCost, setBrokerageCost] = useState(80000);
  const [miscCost, setMiscCost] = useState(10000);

  const baseValue = Math.max(propertyValue, guidanceValue);
  const stampDuty = baseValue * (stampDutyPercent / 100);
  const registration = baseValue * (registrationPercent / 100);
  const cess = stampDuty * (cessPercent / 100);
  const statutoryTotal = stampDuty + registration + cess;
  const optionalFeesTotal = legalDocCost + khataCost + brokerageCost + miscCost;
  
  const totalTransactionCost = statutoryTotal + optionalFeesTotal;
  const totalAcquisitionCost = propertyValue + totalTransactionCost;
  const cashRequiredAtRegistration = statutoryTotal + legalDocCost + miscCost;

  const summaryMarkdown = `### Stamp Duty & Registration Detailed Projections
*   **Property Value**: ${formatINR(propertyValue)} (Guidance: ${formatINR(guidanceValue)})
*   **Base Value for Duty**: ${formatINR(baseValue)}
*   **Stamp Duty (${stampDutyPercent}%)**: ${formatINR(Math.round(stampDuty))}
*   **Registration Fee (${registrationPercent}%)**: ${formatINR(Math.round(registration))}
*   **Surcharge/Cess (${cessPercent}% of duty)**: ${formatINR(Math.round(cess))}
*   **Statutory Fees Total**: ${formatINR(Math.round(statutoryTotal))}
*   **Advisory/Misc Fees Total**: ${formatINR(Math.round(optionalFeesTotal))}
*   **Total Transaction Costs**: ${formatINR(Math.round(totalTransactionCost))}
*   **Total Acquisition Cost**: ${formatINR(Math.round(totalAcquisitionCost))}
*   **Cash Required at Registration**: ${formatINR(Math.round(cashRequiredAtRegistration))}
*   *Note: Planning assumptions only. Government rates vary and require verification.*`;

  const inputs = (
    <div className="space-y-6 text-xs text-slate-700 font-sans">
      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Property Value & Parameters
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-1">Market Property Value (INR)</label>
          <input id="stampdutyregistrationdetailedcalculator-field-1"
            type="number" min="0"
            value={propertyValue}
            onChange={(e) => setPropertyValue(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-2">Sub-Registrar Guidance Value (INR)</label>
          <input id="stampdutyregistrationdetailedcalculator-field-2"
            type="number" min="0"
            value={guidanceValue}
            onChange={(e) => setGuidanceValue(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-3">Buyer Type</label>
          <select id="stampdutyregistrationdetailedcalculator-field-3"
            value={buyerType}
            onChange={(e) => setBuyerType(e.target.value)}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          >
            <option value="male">Male (Individual)</option>
            <option value="female">Female (Individual)</option>
            <option value="joint">Joint Ownership</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-4">Property Type</label>
          <select id="stampdutyregistrationdetailedcalculator-field-4"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          >
            <option value="apartment">Apartment</option>
            <option value="plot">Plot / Site</option>
            <option value="villa">Villa / House</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-5">Location Zone</label>
          <select id="stampdutyregistrationdetailedcalculator-field-5"
            value={locationState}
            onChange={(e) => setLocationState(e.target.value)}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          >
            <option value="bbmp">BBMP Area (Urban)</option>
            <option value="bmrda">BMRDA Area (Suburban)</option>
            <option value="dtcp_gp">Gram Panchayat / DTCP</option>
          </select>
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100 pt-2">
        Editable Planning Assumptions (Rates & Cess)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-6">Stamp Duty (%)</label>
          <input id="stampdutyregistrationdetailedcalculator-field-6"
            type="number" min="0"
            step="0.1"
            value={stampDutyPercent}
            onChange={(e) => setStampDutyPercent(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-7">Registration Fee (%)</label>
          <input id="stampdutyregistrationdetailedcalculator-field-7"
            type="number" min="0"
            step="0.1"
            value={registrationPercent}
            onChange={(e) => setRegistrationPercent(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-8">Surcharge / Cess (% of Duty)</label>
          <input id="stampdutyregistrationdetailedcalculator-field-8"
            type="number" min="0"
            value={cessPercent}
            onChange={(e) => setCessPercent(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100 pt-2">
        Advisory & Handholding Costs (Illustrative)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-9">Legal Review & Drafting (INR)</label>
          <input id="stampdutyregistrationdetailedcalculator-field-9"
            type="number" min="0"
            value={legalDocCost}
            onChange={(e) => setLegalDocCost(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3.5 py-1.5 text-[#10291f] font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-10">E-Khata Transfer Services (INR)</label>
          <input id="stampdutyregistrationdetailedcalculator-field-10"
            type="number" min="0"
            value={khataCost}
            onChange={(e) => setKhataCost(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3.5 py-1.5 text-[#10291f] font-semibold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-11">Advisory/Service Fees (INR)</label>
          <input id="stampdutyregistrationdetailedcalculator-field-11"
            type="number" min="0"
            value={brokerageCost}
            onChange={(e) => setBrokerageCost(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3.5 py-1.5 text-[#10291f] font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="stampdutyregistrationdetailedcalculator-field-12">Miscellaneous / Franking (INR)</label>
          <input id="stampdutyregistrationdetailedcalculator-field-12"
            type="number" min="0"
            value={miscCost}
            onChange={(e) => setMiscCost(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3.5 py-1.5 text-[#10291f] font-semibold"
          />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-xs font-sans">
      <div className="border-b border-[#1d3e30] pb-4">
        <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block mb-1">Statutory Fees Total</span>
        <div className="text-4xl font-sans font-bold text-white tracking-tight">
          {formatINR(Math.round(statutoryTotal))}
          <span className="text-xs text-slate-300 font-sans font-medium block mt-1">Stamp Duty, Registration, & Cess</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <span className="text-slate-300 block font-medium">Stamp Duty ({stampDutyPercent}%)</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(stampDuty))}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Registration ({registrationPercent}%)</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(registration))}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-[#1d3e30] pt-4">
        <div>
          <span className="text-slate-300 block font-medium">Total Transaction Cost</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(totalTransactionCost))}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Cash Needed at Registry</span>
          <span className="text-sm font-bold text-[#d9c79f] block mt-0.5">{formatINR(Math.round(cashRequiredAtRegistration))}</span>
        </div>
      </div>

      <div className="border-t border-[#1d3e30] pt-4 space-y-2">
        <div className="flex justify-between font-medium">
          <span className="text-slate-300">Total Capital Cost:</span>
          <span className="text-emerald-400 font-bold">{formatINR(Math.round(totalAcquisitionCost))}</span>
        </div>
      </div>
    </div>
  );

  const explanation = (
    <div className="space-y-6 text-xs text-slate-600 font-sans leading-relaxed">
      <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Planning Insights & Guidance Value Guidelines
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Understanding Guidance Values</h4>
          <p>
            The Sub-Registrar Guidance Value is the minimum value at which a property can be registered. It is declared officially by the Department of Stamps and Registration in Karnataka.
          </p>
          <p>
            If the market transaction rate is higher than the Guidance Value, stamp duty is calculated on the transaction rate. If the transaction rate is lower, registration is restricted unless specific clearances are obtained.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Cess & Surcharge Slabs</h4>
          <ul className="list-disc pl-4 space-y-1.5 font-medium text-slate-700">
            <li>Urban properties under BBMP attract a 10% cess and 2% surcharge on stamp duty.</li>
            <li>Rural properties attract lower surcharges.</li>
            <li>Verify concessional rates for lower budget slabs if applicable in local policy.</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="Stamp Duty & Registration Calculator"
      subtitle="Estimate statutory stamp duty, cess surcharges, sub-registrar fees, and registration costs in Karnataka."
      category="Taxes & Acquisition"
      inputs={inputs}
      results={results}
      explanation={explanation}
      actionBar={
        <CalculatorActionBar
          calculatorName="Stamp Duty & Registration Detailed Planner"
          summaryMarkdown={summaryMarkdown}
        />
      }
    />
  );
};
