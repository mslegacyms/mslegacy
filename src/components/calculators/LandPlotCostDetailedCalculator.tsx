"use client";

import React, { useState } from "react";
import { validateNumbers } from "@/lib/calculators/financialMath";
import { formatINR } from "@/lib/utils";
import { CalculatorShell } from "./CalculatorShell";
import { CalculatorActionBar } from "./CalculatorActionBar";

export const LandPlotCostDetailedCalculator = () => {
  const [landSize, setLandSize] = useState(2400); // 40x60 site or acreage
  const [unit, setUnit] = useState("sqft"); // sqft, acre, gunta, cent
  const [ratePerUnit, setRatePerUnit] = useState(4500);
  const [location, setLocation] = useState("Bangalore East");
  
  // Status inputs
  const [roadAccess, setRoadAccess] = useState("main_road"); // highway, main_road, cross_road
  const [conversionStatus, setConversionStatus] = useState("converted"); // converted, pending, agricultural
  const [titleStatus, setTitleStatus] = useState("clear"); // clear, pending_audit, dispute_check

  // Editable transaction cost assumptions
  const [stampDutyPercent, setStampDutyPercent] = useState(5.6);
  const [registrationPercent, setRegistrationPercent] = useState(1.0);
  const [legalVerificationCost, setLegalVerificationCost] = useState(35000);
  const [surveySketchCost, setSurveySketchCost] = useState(12000);
  const [brokerageFee, setBrokerageFee] = useState(60000);

  // Editable physical development costs
  const [boundaryFencingCost, setBoundaryFencingCost] = useState(50000);
  const [cleaningDevelopmentCost, setCleaningDevelopmentCost] = useState(75000);
  const [holdingCostAnnual, setHoldingCostAnnual] = useState(20000);

  const validationError = validateNumbers({ landSize, ratePerUnit, stampDutyPercent, registrationPercent, legalVerificationCost, surveySketchCost, brokerageFee, boundaryFencingCost, cleaningDevelopmentCost, holdingCostAnnual }, ["landSize", "ratePerUnit"], ["stampDutyPercent", "registrationPercent"]);

  // Area conversion to Sq.Ft for uniform calculations
  const getAreaInSqFt = () => {
    switch (unit) {
      case "acre": return landSize * 43560;
      case "gunta": return landSize * 1089;
      case "cent": return landSize * 435.6;
      default: return landSize;
    }
  };

  const areaSqFt = getAreaInSqFt();
  const baseLandCost = landSize * ratePerUnit;
  
  const stampDuty = baseLandCost * (stampDutyPercent / 100);
  const registration = baseLandCost * (registrationPercent / 100);
  const statutoryTotal = stampDuty + registration + legalVerificationCost + surveySketchCost + brokerageFee;

  const physicalDevTotal = boundaryFencingCost + cleaningDevelopmentCost + holdingCostAnnual;
  const totalAcquisitionCost = baseLandCost + statutoryTotal + physicalDevTotal;
  const effectiveCostPerSqFt = areaSqFt > 0 ? totalAcquisitionCost / areaSqFt : 0;

  // Risk flags
  const risks: string[] = [];
  if (conversionStatus === "agricultural") risks.push("⚠️ High Risk: Agricultural status requires formal DC Conversion layout approvals before any construction.");
  if (titleStatus === "dispute_check") risks.push("⚠️ Critical Warning: Legal disputes or partition issues found in title trail. Immediate litigation check required.");
  if (roadAccess === "cross_road") risks.push("💡 Notice: Cross-road accessibility might limit heavy vehicle entry during civil construction phases.");

  const summaryMarkdown = `### Land / Plot Cost Detailed Projections
*   **Location**: ${location}
*   **Land Size**: ${landSize} ${unit} (~${areaSqFt.toFixed(0)} Sq.Ft)
*   **Base Land Cost**: ${formatINR(baseLandCost)}
*   **Statutory & Legal Fees**: ${formatINR(statutoryTotal)}
*   **Development & Fencing**: ${formatINR(physicalDevTotal)}
*   **Total Acquisition Cost**: ${formatINR(totalAcquisitionCost)}
*   **Effective Cost per Sq.Ft**: ${formatINR(Math.round(effectiveCostPerSqFt))} / sq.ft
*   **Title Status / Conversion**: ${titleStatus.toUpperCase()} / ${conversionStatus.toUpperCase()}
*   *Note: Planning estimate only. Verify land title trails, survey sketches, and DC status before signing.*`;

  const inputs = (
    <div className="space-y-6 text-xs text-slate-700 font-sans">
      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Land Area & Pricing
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Land Size / Area</label>
          <div className="flex space-x-2">
            <input
              type="number" min="0"
              value={landSize}
              onChange={(e) => setLandSize(Number(e.target.value))}
              className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="bg-[#f8f5ef]/50 border border-slate-200 rounded px-2 py-2 text-[#10291f] font-semibold focus:outline-none"
            >
              <option value="sqft">Sq.Ft</option>
              <option value="gunta">Guntas</option>
              <option value="acre">Acres</option>
              <option value="cent">Cents</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-1">Rate per Unit (INR)</label>
          <input id="landplotcostdetailedcalculator-field-1"
            type="number" min="0"
            value={ratePerUnit}
            onChange={(e) => setRatePerUnit(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none focus:border-gold-elegant"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-2">Title Status</label>
          <select id="landplotcostdetailedcalculator-field-2"
            value={titleStatus}
            onChange={(e) => setTitleStatus(e.target.value)}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          >
            <option value="clear">Verified Clear Title</option>
            <option value="pending_audit">Title Audit Pending</option>
            <option value="dispute_check">Disputed / Under Litigation</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-3">Conversion Status</label>
          <select id="landplotcostdetailedcalculator-field-3"
            value={conversionStatus}
            onChange={(e) => setConversionStatus(e.target.value)}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          >
            <option value="converted">DC Converted (Residential)</option>
            <option value="pending">DC Conversion Pending</option>
            <option value="agricultural">Agricultural Status (Green)</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-4">Access Road Width</label>
          <select id="landplotcostdetailedcalculator-field-4"
            value={roadAccess}
            onChange={(e) => setRoadAccess(e.target.value)}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          >
            <option value="highway">National/State Highway</option>
            <option value="main_road">60/40 Ft Main Road</option>
            <option value="cross_road">30/25 Ft Cross Road</option>
          </select>
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100 pt-2">
        Statutory & Acquisition Reserves (Editable)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-5">Stamp Duty (%)</label>
          <input id="landplotcostdetailedcalculator-field-5"
            type="number" min="0"
            step="0.1"
            value={stampDutyPercent}
            onChange={(e) => setStampDutyPercent(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-6">Registration (%)</label>
          <input id="landplotcostdetailedcalculator-field-6"
            type="number" min="0"
            step="0.1"
            value={registrationPercent}
            onChange={(e) => setRegistrationPercent(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-7">Title Check Cost (INR)</label>
          <input id="landplotcostdetailedcalculator-field-7"
            type="number" min="0"
            value={legalVerificationCost}
            onChange={(e) => setLegalVerificationCost(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-8">Survey & Sketch fees (INR)</label>
          <input id="landplotcostdetailedcalculator-field-8"
            type="number" min="0"
            value={surveySketchCost}
            onChange={(e) => setSurveySketchCost(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3.5 py-1.5 text-[#10291f] font-semibold"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-9">Brokerage Fees (INR)</label>
          <input id="landplotcostdetailedcalculator-field-9"
            type="number" min="0"
            value={brokerageFee}
            onChange={(e) => setBrokerageFee(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3.5 py-1.5 text-[#10291f] font-semibold"
          />
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100 pt-2">
        Physical Development & Holding
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-10">Fencing / Boundary (INR)</label>
          <input id="landplotcostdetailedcalculator-field-10"
            type="number" min="0"
            value={boundaryFencingCost}
            onChange={(e) => setBoundaryFencingCost(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-11">Site Levelling (INR)</label>
          <input id="landplotcostdetailedcalculator-field-11"
            type="number" min="0"
            value={cleaningDevelopmentCost}
            onChange={(e) => setCleaningDevelopmentCost(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="landplotcostdetailedcalculator-field-12">Annual Holding Tax (INR)</label>
          <input id="landplotcostdetailedcalculator-field-12"
            type="number" min="0"
            value={holdingCostAnnual}
            onChange={(e) => setHoldingCostAnnual(Number(e.target.value))}
            className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 text-[#10291f] font-semibold focus:outline-none"
          />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-xs font-sans">
      <div className="border-b border-[#1d3e30] pb-4">
        <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block mb-1">Total Capital Outlay</span>
        <div className="text-4xl font-sans font-bold text-white tracking-tight">
          {formatINR(Math.round(totalAcquisitionCost))}
          <span className="text-xs text-slate-300 font-sans font-medium block mt-1">Total Plot Acquisition Cost</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <span className="text-slate-300 block font-medium">Base Land Price</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(baseLandCost)}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Statutory & Stamp Total</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(statutoryTotal))}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-[#1d3e30] pt-4">
        <div>
          <span className="text-slate-300 block font-medium">Physical Setup Cost</span>
          <span className="text-sm font-bold text-white block mt-0.5">{formatINR(Math.round(physicalDevTotal))}</span>
        </div>
        <div>
          <span className="text-slate-300 block font-medium">Effective Cost / Sq.Ft</span>
          <span className="text-sm font-bold text-[#d9c79f] block mt-0.5">{formatINR(Math.round(effectiveCostPerSqFt))} / sqft</span>
        </div>
      </div>

      {risks.length > 0 && (
        <div className="bg-[#381a1a] p-3 rounded border border-rose-500/20 text-rose-300 font-semibold space-y-1.5">
          <span className="text-[9px] uppercase font-bold tracking-wider block text-rose-400">Risk Assessment Flags</span>
          {risks.map((r, i) => (
            <p key={i} className="text-[10px] leading-relaxed">{r}</p>
          ))}
        </div>
      )}
    </div>
  );

  const explanation = (
    <div className="space-y-6 text-xs text-slate-600 font-sans leading-relaxed">
      <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Plot Acquisition & Title Check Guidelines
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Title Due Diligence Trail</h4>
          <p>
            Before purchasing land, execute a legal title trace search for at least 30 years to check for mutations, joint family release deeds, or pending mortgage liens.
          </p>
          <p>
            Verify that the land has an active Bhoomi RTC record, e-Swathu Gram Panchayat registration, or BDA/BMRDA layout approval endorsement.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Physical Site Check Checklist</h4>
          <ul className="list-disc pl-4 space-y-1.5 font-medium text-slate-700">
            <li>Ensure a licensed surveyor verifies the boundary coordinates.</li>
            <li>Verify physical road widths against sanctioned layout maps.</li>
            <li>Confirm there are no buffer zone restrictions for open drains, power corridors, or lakes nearby.</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      validationError={validationError}
      title="Land / Plot Cost Planner"
      subtitle="Proportion base land rates, registration duties, survey sketch costs, and boundary fencing expenses."
      category="Construction & Plots"
      inputs={inputs}
      results={results}
      explanation={explanation}
      actionBar={
        <CalculatorActionBar
          calculatorName="Land / Plot Cost Detailed Planner"
          summaryMarkdown={summaryMarkdown}
        />
      }
    />
  );
};
