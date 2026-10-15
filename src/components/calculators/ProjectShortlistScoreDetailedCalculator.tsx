"use client";

import React, { useState } from "react";
import { CalculatorShell } from "./CalculatorShell";
import { CalculatorActionBar } from "./CalculatorActionBar";

export const ProjectShortlistScoreDetailedCalculator = () => {
  const [locationStrength, setLocationStrength] = useState(8);
  const [developerReputation, setDeveloperReputation] = useState(8);
  const [reraDocClarity, setReraDocClarity] = useState(7);
  const [connectivity, setConnectivity] = useState(7);
  const [priceFit, setPriceFit] = useState(9);
  const [unitPlanFit, setUnitPlanFit] = useState(8);
  const [amenitiesFit, setAmenitiesFit] = useState(6);
  const [rentalPotential, setRentalPotential] = useState(7);
  const [resaleLiquidity, setResaleLiquidity] = useState(6);
  const [constructionProgress, setConstructionProgress] = useState(7);
  const [legalTitleComfort, setLegalTitleComfort] = useState(8);
  const [nriSuitability, setNriSuitability] = useState(7);

  const totalScore = locationStrength + developerReputation + reraDocClarity + connectivity + priceFit + unitPlanFit + amenitiesFit + rentalPotential + resaleLiquidity + constructionProgress + legalTitleComfort + nriSuitability;
  const maxPossible = 120;
  const percentageScore = (totalScore / maxPossible) * 100;

  const getGrade = () => {
    if (legalTitleComfort < 6 || reraDocClarity < 6) return { grade: "D", text: "Caution: Legal title or RERA entries show warning signals.", style: "text-rose-400" };
    if (percentageScore >= 80) return { grade: "A", text: "Strong Fit: Property aligns closely with safe planning protocols.", style: "text-emerald-400" };
    if (percentageScore >= 65) return { grade: "B", text: "Good Alternative: Standard site checks and documentation checks suggested.", style: "text-amber-400" };
    return { grade: "C", text: "Marginal Fit: Consider exploring other developers or corridors.", style: "text-slate-400" };
  };

  const verdict = getGrade();

  // Top Strengths & Risks
  const strengths: string[] = [];
  const risks: string[] = [];

  if (priceFit >= 8) strengths.push("Strong Value Fit: Price align matches budget benchmarks.");
  if (locationStrength >= 8) strengths.push("Prime Corridor: Location shows strong infrastructure and connectivity projections.");
  if (legalTitleComfort >= 8) strengths.push("Clear Title: Promoter documentation shows a clear registration trail.");

  if (reraDocClarity < 7) risks.push("RERA Clearance: Verify pending project extension notifications on Karnataka RERA portal.");
  if (constructionProgress < 6) risks.push("Slowing Pace: Early construction stages indicate delivery risk.");
  if (resaleLiquidity < 6) risks.push("Liquidity Risk: Secondary market resale volume in this micro-market is slow.");

  const summaryMarkdown = `### Project Shortlist Scorecard Detailed Projections
*   **Total Score**: ${totalScore} / ${maxPossible} (${percentageScore.toFixed(1)}%)
*   **Grade**: ${verdict.grade} (${verdict.text})
*   **Location Strength (1-10)**: ${locationStrength}
*   **Legal Title Comfort (1-10)**: ${legalTitleComfort}
*   **Developer Rep (1-10)**: ${developerReputation}
*   **Price / Budget Fit (1-10)**: ${priceFit}
*   **Shortlist recommendation**: ${percentageScore >= 80 ? "Pre-approve for acquisition." : "Needs due diligence trail."}
*   *Note: Planning estimate only. Verify parameters with independent site inspections.*`;

  const inputs = (
    <div className="space-y-6 text-xs text-slate-700 font-sans">
      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Primary Score Parameters (1 - 10)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-1">Location Strength ({locationStrength}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-1"
            type="range"
            min="1" max="10"
            value={locationStrength}
            onChange={(e) => setLocationStrength(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-2">Developer Reputation ({developerReputation}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-2"
            type="range"
            min="1" max="10"
            value={developerReputation}
            onChange={(e) => setDeveloperReputation(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-3">RERA Entry Clarity ({reraDocClarity}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-3"
            type="range"
            min="1" max="10"
            value={reraDocClarity}
            onChange={(e) => setReraDocClarity(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-4">Transit Connectivity ({connectivity}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-4"
            type="range"
            min="1" max="10"
            value={connectivity}
            onChange={(e) => setConnectivity(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-5">Price / Value Fit ({priceFit}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-5"
            type="range"
            min="1" max="10"
            value={priceFit}
            onChange={(e) => setPriceFit(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-6">Unit Plan layout Fit ({unitPlanFit}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-6"
            type="range"
            min="1" max="10"
            value={unitPlanFit}
            onChange={(e) => setUnitPlanFit(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold text-[#10291f] border-b pb-2 border-slate-100 pt-2">
        Secondary & Investment Parameters (1 - 10)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-7">Amenities & Common Areas ({amenitiesFit}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-7"
            type="range"
            min="1" max="10"
            value={amenitiesFit}
            onChange={(e) => setAmenitiesFit(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-8">Rental Potential ({rentalPotential}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-8"
            type="range"
            min="1" max="10"
            value={rentalPotential}
            onChange={(e) => setRentalPotential(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-9">Resale Liquidity ({resaleLiquidity}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-9"
            type="range"
            min="1" max="10"
            value={resaleLiquidity}
            onChange={(e) => setResaleLiquidity(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-10">Construction Speed ({constructionProgress}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-10"
            type="range"
            min="1" max="10"
            value={constructionProgress}
            onChange={(e) => setConstructionProgress(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-11">Legal Title Comfort ({legalTitleComfort}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-11"
            type="range"
            min="1" max="10"
            value={legalTitleComfort}
            onChange={(e) => setLegalTitleComfort(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1" htmlFor="projectshortlistscoredetailedcalculator-field-12">NRI / Offshore Suitability ({nriSuitability}/10)</label>
          <input id="projectshortlistscoredetailedcalculator-field-12"
            type="range"
            min="1" max="10"
            value={nriSuitability}
            onChange={(e) => setNriSuitability(Number(e.target.value))}
            className="w-full accent-[#8b6e3a] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );

  const results = (
    <div className="space-y-6 text-xs font-sans">
      <div className="border-b border-[#1d3e30] pb-4">
        <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block mb-1">Shortlist Score Verdict</span>
        <div className="text-4xl font-sans font-bold text-white tracking-tight">
          Grade {verdict.grade}
          <span className={`text-xs font-sans font-medium block mt-1 ${verdict.style}`}>
            {totalScore} / {maxPossible} Points ({percentageScore.toFixed(0)}%)
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <span className="text-slate-300 block font-medium uppercase text-[9px] tracking-wider">Top Fit Strengths</span>
        {strengths.length > 0 ? (
          <ul className="list-disc pl-4 space-y-1 text-white">
            {strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        ) : (
          <span className="text-slate-400">None detected.</span>
        )}
      </div>

      <div className="border-t border-[#1d3e30] pt-4 space-y-3">
        <span className="text-slate-300 block font-medium uppercase text-[9px] tracking-wider text-rose-400">Identified Risks</span>
        {risks.length > 0 ? (
          <ul className="list-disc pl-4 space-y-1 text-[#fca5a5]">
            {risks.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        ) : (
          <span className="text-slate-400">None detected.</span>
        )}
      </div>
    </div>
  );

  const explanation = (
    <div className="space-y-6 text-xs text-slate-600 font-sans leading-relaxed">
      <h3 className="font-serif text-2xl font-bold text-[#10291f] border-b pb-2 border-slate-100">
        Planning Insights & Shortlist Verification Trails
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Weighted Scoring Systems</h4>
          <p>
            This scorecard helps objectively compare multiple project layouts or apartments. Do not let amenities or cosmetic elevation features distract from legal title clarity and construction timelines.
          </p>
          <p>
            Any project scoring below 6 in "Legal Title Comfort" or "RERA Entry Clarity" should be subjected to a 30-year litigation search before submitting any deposits.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-lg font-bold text-[#10291f]">Next Steps Checklist</h4>
          <ul className="list-disc pl-4 space-y-1.5 font-medium text-slate-700">
            <li>Review comparative scores for at least 3 shortlisted projects.</li>
            <li>Submit the final shortlist to an independent legal firm to audit title flow deeds.</li>
            <li>Run a secondary check on RERA complaints registers for the promoter group.</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="Project Shortlist Scorecard"
      subtitle="Score and compare multiple layout or apartment prospects objectively on key statutory metrics."
      category="Buyer Planning"
      inputs={inputs}
      results={results}
      explanation={explanation}
      actionBar={
        <CalculatorActionBar
          calculatorName="Project Shortlist Scorecard Detailed Planner"
          summaryMarkdown={summaryMarkdown}
        />
      }
    />
  );
};
