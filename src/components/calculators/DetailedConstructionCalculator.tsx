"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { CalculatorActionBar } from "./CalculatorActionBar";
import { CalculatorDisclaimer } from "./CalculatorDisclaimer";

interface PresetProfile {
  label: string;
  civilRate: number; // per sq ft
  mepRate: number; // per sq ft
  interiorRate: number; // per sq ft
  siteDevRate: number; // per sq ft
  professionalFeePercent: number;
  utilityCost: number;
}

const PRESETS: Record<string, PresetProfile> = {
  basic: {
    label: "Basic Quality",
    civilRate: 1600,
    mepRate: 250,
    interiorRate: 350,
    siteDevRate: 150,
    professionalFeePercent: 5,
    utilityCost: 150000
  },
  standard: {
    label: "Standard Quality",
    civilRate: 2000,
    mepRate: 350,
    interiorRate: 500,
    siteDevRate: 250,
    professionalFeePercent: 7,
    utilityCost: 250000
  },
  premium: {
    label: "Premium Quality",
    civilRate: 2500,
    mepRate: 500,
    interiorRate: 800,
    siteDevRate: 400,
    professionalFeePercent: 10,
    utilityCost: 400000
  },
  luxury: {
    label: "Luxury Quality",
    civilRate: 3500,
    mepRate: 750,
    interiorRate: 1200,
    siteDevRate: 600,
    professionalFeePercent: 12,
    utilityCost: 650000
  },
  ultra_luxury: {
    label: "Ultra Luxury Quality",
    civilRate: 5000,
    mepRate: 1200,
    interiorRate: 2000,
    siteDevRate: 1000,
    professionalFeePercent: 15,
    utilityCost: 1000000
  }
};

export const DetailedConstructionCalculator = () => {
  const [selectedPreset, setSelectedPreset] = useState("standard");
  const [plotSize, setPlotSize] = useState(1200);
  const [builtUpArea, setBuiltUpArea] = useState(2400);
  const [floors, setFloors] = useState(2);
  const [hasBasement, setHasBasement] = useState(false);
  const [terraceFeature, setTerraceFeature] = useState("basic");
  
  // Editable Planning Assumptions
  const [civilRate, setCivilRate] = useState(PRESETS.standard.civilRate);
  const [mepRate, setMepRate] = useState(PRESETS.standard.mepRate);
  const [interiorRate, setInteriorRate] = useState(PRESETS.standard.interiorRate);
  const [siteDevRate, setSiteDevRate] = useState(PRESETS.standard.siteDevRate);
  const [professionalPercent, setProfessionalPercent] = useState(PRESETS.standard.professionalFeePercent);
  const [utilityCost, setUtilityCost] = useState(PRESETS.standard.utilityCost);
  const [contingencyPercent, setContingencyPercent] = useState(5);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sync inputs on preset change
  useEffect(() => {
    const preset = PRESETS[selectedPreset];
    if (preset) {
      setCivilRate(preset.civilRate);
      setMepRate(preset.mepRate);
      setInteriorRate(preset.interiorRate);
      setSiteDevRate(preset.siteDevRate);
      setProfessionalPercent(preset.professionalFeePercent);
      setUtilityCost(preset.utilityCost);
    }
  }, [selectedPreset]);

  // Calculations
  const baseArea = builtUpArea;
  const basementMultiplier = hasBasement ? 1.25 : 1.0;
  
  const totalCivil = Math.round(baseArea * civilRate * basementMultiplier);
  const totalMep = Math.round(baseArea * mepRate);
  const totalInteriors = Math.round(baseArea * interiorRate);
  
  let terraceBonus = 0;
  if (terraceFeature === "landscaped") terraceBonus = 150000;
  else if (terraceFeature === "solar") terraceBonus = 350000;
  else if (terraceFeature === "pergola") terraceBonus = 200000;

  const totalSiteDev = Math.round(plotSize * siteDevRate + terraceBonus);
  
  const subtotalConstruction = totalCivil + totalMep + totalInteriors + totalSiteDev;
  const totalProfessional = Math.round(subtotalConstruction * (professionalPercent / 100));
  
  const subtotalWithFees = subtotalConstruction + totalProfessional + utilityCost;
  const contingencyAmount = Math.round(subtotalWithFees * (contingencyPercent / 100));
  
  const grandTotal = subtotalWithFees + contingencyAmount;
  const costPerSqFt = Math.round(grandTotal / builtUpArea);

  const summaryMarkdown = `### Detailed Construction Cost Projections
*   **Quality Preset**: ${PRESETS[selectedPreset]?.label || selectedPreset}
*   **Plot / Built-up Size**: ${plotSize} sqft / ${builtUpArea} sqft (${floors} Floors)
*   **Civil Structure**: ${formatINR(totalCivil)}
*   **MEP Services**: ${formatINR(totalMep)}
*   **Interiors**: ${formatINR(totalInteriors)}
*   **Site & Landscape**: ${formatINR(totalSiteDev)}
*   **PMC & Professional Fees**: ${formatINR(totalProfessional)}
*   **Contingency Amount**: ${formatINR(contingencyAmount)}
*   **Grand Total Estimate**: ${formatINR(grandTotal)}
*   **Rate per Sq.Ft**: ${formatINR(costPerSqFt)} / sqft
*   *Note: Planning estimate only. Verify final parameters with BOQ and soil reports.*`;

  // Reset helper
  const handleReset = () => {
    setSelectedPreset("standard");
    setPlotSize(1200);
    setBuiltUpArea(2400);
    setFloors(2);
    setHasBasement(false);
    setTerraceFeature("basic");
    setContingencyPercent(5);
  };

  return (
    <div className="space-y-8 font-sans text-[#10291f] text-xs">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#10291f]">Detailed Construction Cost Calculator</h2>
        <p className="text-slate-500 mt-1 font-medium text-xs leading-relaxed">
          Estimate civil construction, interior design, regulatory approvals, PMC fees, utility services, and cash flows using editable planning assumptions.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {Object.entries(PRESETS).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => setSelectedPreset(key)}
            className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
              selectedPreset === key ? "bg-[#10291f] text-white" : "bg-slate-50 border text-slate-600"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 bg-white border border-gold-elegant space-y-6">
            <div>
              <h3 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">A. Project Parameters</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Plot Area (Sq.Ft)</label>
                <input
                  type="number"
                  value={plotSize}
                  onChange={(e) => setPlotSize(Number(e.target.value))}
                  className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 font-bold text-slate-700 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Built-up Area (Sq.Ft)</label>
                <input
                  type="number"
                  value={builtUpArea}
                  onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                  className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 font-bold text-slate-700 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Number of Floors</label>
                <input
                  type="number"
                  value={floors}
                  onChange={(e) => setFloors(Number(e.target.value))}
                  className="w-full bg-[#f8f5ef]/50 border border-slate-200 rounded px-3 py-2 font-bold text-slate-700 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Basement Structure</label>
                <select
                  value={hasBasement ? "yes" : "no"}
                  onChange={(e) => setHasBasement(e.target.value === "yes")}
                  className="w-full bg-white border border-slate-200 rounded px-3 py-2 font-bold text-slate-700 focus:outline-none"
                >
                  <option value="no">No Basement</option>
                  <option value="yes">Include Basement Structure</option>
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Terrace Finish Tier</label>
                <select
                  value={terraceFeature}
                  onChange={(e) => setTerraceFeature(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded px-3 py-2 font-bold text-slate-700 focus:outline-none"
                >
                  <option value="none">Basic Concrete Finish</option>
                  <option value="basic">Terrace Tiling & Waterproofing</option>
                  <option value="landscaped">Landscaped Terrace Garden</option>
                  <option value="solar">Solar Panel Structural Mounts</option>
                  <option value="pergola">Terrace Pergola & Seating</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-[#8b6e3a] font-bold underline hover:text-[#10291f]"
              >
                {showAdvanced ? "Hide Advanced Rate Assumptions" : "Edit Planning Rate Assumptions"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-slate-400 hover:text-rose-600 font-bold"
              >
                Reset Fields
              </button>
            </div>

            {/* Advanced assumptions settings wrapper */}
            {showAdvanced && (
              <div className="space-y-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Civil construction rate (₹/Sq.Ft)</label>
                  <input
                    type="number"
                    value={civilRate}
                    onChange={(e) => setCivilRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-700 focus:outline-none"
                  />
                  <span className="text-[9px] text-slate-400 block italic">Editable planning assumption</span>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">MEP services rate (₹/Sq.Ft)</label>
                  <input
                    type="number"
                    value={mepRate}
                    onChange={(e) => setMepRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-700 focus:outline-none"
                  />
                  <span className="text-[9px] text-slate-400 block italic">Editable planning assumption</span>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Interior woodworks rate (₹/Sq.Ft)</label>
                  <input
                    type="number"
                    value={interiorRate}
                    onChange={(e) => setInteriorRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-700 focus:outline-none"
                  />
                  <span className="text-[9px] text-slate-400 block italic">Editable planning assumption</span>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Site development rate (₹/Plot Sq.Ft)</label>
                  <input
                    type="number"
                    value={siteDevRate}
                    onChange={(e) => setSiteDevRate(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-700 focus:outline-none"
                  />
                  <span className="text-[9px] text-slate-400 block italic">Editable planning assumption</span>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">PMC & Design Fee (%)</label>
                  <input
                    type="number"
                    value={professionalPercent}
                    onChange={(e) => setProfessionalPercent(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-700 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase">Contingency allocation (%)</label>
                  <input
                    type="number"
                    value={contingencyPercent}
                    onChange={(e) => setContingencyPercent(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-700 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Phase-wise budget breakdown */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">Phase-Wise Budget Splits</h3>
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between">
                <span>Design & municipal approvals (10%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.1))}</span>
              </div>
              <div className="flex justify-between">
                <span>Foundation & superstructure casting (35%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.35))}</span>
              </div>
              <div className="flex justify-between">
                <span>Brickwork, plastering & masonry (15%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.15))}</span>
              </div>
              <div className="flex justify-between">
                <span>MEP utilities & HVAC layout (10%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.1))}</span>
              </div>
              <div className="flex justify-between">
                <span>Flooring, cladding & external elevation (15%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.15))}</span>
              </div>
              <div className="flex justify-between">
                <span>Interiors, carpentry & handover (15%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.15))}</span>
              </div>
            </div>
          </Card>

          {/* Recommended Cash Flow Plan */}
          <Card className="p-6 bg-white border border-gold-elegant space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#10291f] border-b pb-2">Recommended Cash Flow Schedule</h3>
            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between">
                <span>Month 1–2 (Approvals & excavation - 15%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.15))}</span>
              </div>
              <div className="flex justify-between">
                <span>Month 3–4 (Structure casting - 30%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.3))}</span>
              </div>
              <div className="flex justify-between">
                <span>Month 5–6 (Masonry & MEP - 25%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.25))}</span>
              </div>
              <div className="flex justify-between">
                <span>Month 7–9 (Flooring & finishing - 20%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.2))}</span>
              </div>
              <div className="flex justify-between">
                <span>Month 10+ (Woodworks & handover - 10%):</span>
                <span className="font-bold text-slate-700">{formatINR(Math.round(grandTotal * 0.1))}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sticky Result Column */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <Card className="p-6 bg-[#10291f] text-white border-none space-y-6">
            <div>
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider block">Estimated Budget Summary</span>
              <h3 className="font-sans text-3xl font-bold text-white mt-1">{formatINR(grandTotal)}</h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 block">
                Estimated Rate: {formatINR(costPerSqFt)} / Sq.Ft
              </span>
            </div>

            <div className="space-y-3 text-xs border-t border-white/10 pt-4 text-slate-300">
              <div className="flex justify-between">
                <span>Civil Structure Cost:</span>
                <span className="font-bold text-white">{formatINR(totalCivil)}</span>
              </div>
              <div className="flex justify-between">
                <span>MEP Services Cost:</span>
                <span className="font-bold text-white">{formatINR(totalMep)}</span>
              </div>
              <div className="flex justify-between">
                <span>Interior Woodworks Cost:</span>
                <span className="font-bold text-white">{formatINR(totalInteriors)}</span>
              </div>
              <div className="flex justify-between">
                <span>Site Development & Landscaping:</span>
                <span className="font-bold text-white">{formatINR(totalSiteDev)}</span>
              </div>
              <div className="flex justify-between">
                <span>PMC & Professional design fees:</span>
                <span className="font-bold text-white">{formatINR(totalProfessional)}</span>
              </div>
              <div className="flex justify-between">
                <span>Contingency & miscellaneous:</span>
                <span className="font-bold text-white">{formatINR(contingencyAmount)}</span>
              </div>
            </div>

            <CalculatorActionBar
              calculatorName="Detailed Construction Cost Planner"
              summaryMarkdown={summaryMarkdown}
            />
          </Card>

          {/* Advisory Warning Card */}
          <Card className="p-4 bg-amber-50 border border-amber-200 text-amber-900 leading-relaxed text-[11px] font-sans font-medium space-y-1">
            <strong>Advisory Note Required:</strong>
            <p>
              Estimates are based on standard material costs. Actual pricing requires a formal Bill of Quantities (BOQ), soil testing report, and layout approval clearances.
            </p>
          </Card>
        </div>
      </div>

      <CalculatorDisclaimer />

    </div>
  );
};
