"use client";

import React, { useState } from "react";
import Link from "next/link";

export const ShortlistScoreCalculator = () => {
  const [locationScore, setLocationScore] = useState(8);
  const [legalClarity, setLegalClarity] = useState(9);
  const [reraDoc, setReraDoc] = useState(8);
  const [connectivity, setConnectivity] = useState(7);
  const [reputation, setReputation] = useState(8);
  const [budgetFit, setBudgetFit] = useState(9);
  const [amenitiesFit, setAmenitiesFit] = useState(7);

  const totalScore = locationScore + legalClarity + reraDoc + connectivity + reputation + budgetFit + amenitiesFit;
  const percentageScore = (totalScore / 70) * 100;

  const getVerdict = () => {
    if (legalClarity < 7 || reraDoc < 7) {
      return { label: "RISK WARNING: Title Checks Needed", style: "text-rose-700 bg-rose-500/10 border-rose-500/20" };
    }
    if (percentageScore >= 80) {
      return { label: "EXCELLENT: Ready for Sourcing Sign-off", style: "text-emerald-700 bg-emerald-500/10 border-emerald-500/20" };
    }
    if (percentageScore >= 60) {
      return { label: "GOOD: Standard Siting Verifications Needed", style: "text-amber-700 bg-amber-500/10 border-amber-500/20" };
    }
    return { label: "CAUTION: Investigate Other Alternatives", style: "text-slate-700 bg-slate-500/10 border-slate-500/20" };
  };

  const verdict = getVerdict();

  return (
    <div className="p-6 bg-white border border-gold-elegant rounded font-sans space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div>
          <h4 className="font-serif text-base font-bold text-[#10291f]">Project Shortlist Scorecard</h4>
          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Audit & Siting Fitness Calculator</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Location Potential (1-10)</label>
              <input 
                type="number" 
                min="1" max="10"
                value={locationScore} 
                onChange={(e) => setLocationScore(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Legal Title Clarity (1-10)</label>
              <input 
                type="number" 
                min="1" max="10"
                value={legalClarity} 
                onChange={(e) => setLegalClarity(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">RERA Registry Entry (1-10)</label>
              <input 
                type="number" 
                min="1" max="10"
                value={reraDoc} 
                onChange={(e) => setReraDoc(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Transit Connectivity (1-10)</label>
              <input 
                type="number" 
                min="1" max="10"
                value={connectivity} 
                onChange={(e) => setConnectivity(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Promoter Rep</label>
              <input 
                type="number" 
                min="1" max="10"
                value={reputation} 
                onChange={(e) => setReputation(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Budget Fit</label>
              <input 
                type="number" 
                min="1" max="10"
                value={budgetFit} 
                onChange={(e) => setBudgetFit(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Amenities Fit</label>
              <input 
                type="number" 
                min="1" max="10"
                value={amenitiesFit} 
                onChange={(e) => setAmenitiesFit(Number(e.target.value))} 
                className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1.5 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Total Fitness Score:</span>
            <span className="text-[#10291f] font-bold">{totalScore} / 70 ({percentageScore.toFixed(0)}%)</span>
          </div>
          <div className={`p-3 border rounded text-center font-bold text-xs uppercase ${verdict.style}`}>
            {verdict.label}
          </div>
        </div>

        <Link href="/project-enquiry?interestType=project_due_diligence" className="block text-center">
          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-[#10291f] font-bold text-[10px] uppercase border border-gold-elegant rounded transition-colors duration-200">
            Request MS Legacy Advisory Review
          </button>
        </Link>

        <p className="text-[9px] text-slate-400 leading-relaxed">
          <strong>Advisory Notice:</strong> Estimates only. Grading scorecard is subjective and should not substitute complete municipal clearance search audits. MS Legacy provides planning support, not guaranteed outcomes.
        </p>
      </div>
    </div>
  );
};
