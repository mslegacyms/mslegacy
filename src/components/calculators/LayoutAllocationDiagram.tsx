import React from "react";
import { Card } from "@/components/ui/Card";

interface LayoutAllocationDiagramProps {
  authorityName: string;
  totalSqft: number;
  saleableSqft: number;
  roadSqft: number;
  parkSqft: number;
  caSqft: number;
  utilitySqft: number;
  bufferSqft: number;
  reservedSqft: number;
  totalPlots: number;
  launchBudget: number;
}

export const LayoutAllocationDiagram = ({
  authorityName,
  totalSqft,
  saleableSqft,
  roadSqft,
  parkSqft,
  caSqft,
  utilitySqft,
  bufferSqft,
  reservedSqft,
  totalPlots,
  launchBudget
}: LayoutAllocationDiagramProps) => {
  
  // Percentages for stacked bar
  const saleablePct = Math.round((saleableSqft / totalSqft) * 100);
  const roadPct = Math.round((roadSqft / totalSqft) * 100);
  const parkPct = Math.round((parkSqft / totalSqft) * 100);
  const caPct = Math.round((caSqft / totalSqft) * 100);
  const utilityPct = Math.round((utilitySqft / totalSqft) * 100);
  const bufferPct = Math.round((bufferSqft / totalSqft) * 100);
  const reservedPct = Math.max(0, 100 - (saleablePct + roadPct + parkPct + caPct + utilityPct + bufferPct));

  return (
    <Card className="p-6 bg-white border border-gold-elegant space-y-6 font-sans text-xs text-[#1f2a24]">
      <div>
        <h3 className="font-serif text-base font-bold text-[#10291f] mb-1">Indicative Layout Allocation Drawing</h3>
        <span className="text-[9px] uppercase font-bold text-[#5f6b63] tracking-widest block">
          Visual Feasibility Model · Indicative Only
        </span>
      </div>

      {/* 1. Stacked Land Allocation Bar */}
      <div className="space-y-2">
        <span className="block font-bold text-[10px] text-[#5f6b63] uppercase">Allocation Efficiency Bar</span>
        <div className="w-full h-8 rounded-lg overflow-hidden flex shadow-inner border border-slate-100">
          {saleablePct > 0 && (
            <div 
              style={{ width: `${saleablePct}%` }} 
              className="bg-[#10291f] h-full flex items-center justify-center text-[9px] font-bold text-white transition-all"
              title={`Saleable Plots: ${saleablePct}%`}
            >
              {saleablePct}%
            </div>
          )}
          {roadPct > 0 && (
            <div 
              style={{ width: `${roadPct}%` }} 
              className="bg-[#8b6e3a] h-full flex items-center justify-center text-[9px] font-bold text-white transition-all"
              title={`Roads: ${roadPct}%`}
            >
              {roadPct}%
            </div>
          )}
          {parkPct > 0 && (
            <div 
              style={{ width: `${parkPct}%` }} 
              className="bg-emerald-700 h-full flex items-center justify-center text-[9px] font-bold text-white transition-all"
              title={`Parks: ${parkPct}%`}
            >
              {parkPct}%
            </div>
          )}
          {caPct > 0 && (
            <div 
              style={{ width: `${caPct}%` }} 
              className="bg-amber-600 h-full flex items-center justify-center text-[9px] font-bold text-white transition-all"
              title={`Civic Amenities: ${caPct}%`}
            >
              {caPct}%
            </div>
          )}
          {utilityPct > 0 && (
            <div 
              style={{ width: `${utilityPct}%` }} 
              className="bg-slate-600 h-full flex items-center justify-center text-[9px] font-bold text-white transition-all"
              title={`Utilities: ${utilityPct}%`}
            >
              {utilityPct}%
            </div>
          )}
          {bufferPct > 0 && (
            <div 
              style={{ width: `${bufferPct}%` }} 
              className="bg-rose-700 h-full flex items-center justify-center text-[9px] font-bold text-white transition-all"
              title={`Buffers/Drains: ${bufferPct}%`}
            >
              {bufferPct}%
            </div>
          )}
        </div>
      </div>

      {/* 2. Simple Site Layout Sketch (SVG Model) */}
      <div className="space-y-2">
        <span className="block font-bold text-[10px] text-[#5f6b63] uppercase">Zoning and Road Connectivity Sketch</span>
        <div className="bg-[#f8f5ef]/50 border border-slate-100 rounded-lg p-4 flex justify-center items-center">
          <svg viewBox="0 0 400 240" className="w-full max-w-[400px] h-auto drop-shadow-sm">
            {/* Base land boundary */}
            <rect x="10" y="10" width="380" height="220" rx="10" fill="#ffffff" stroke="#10291f" strokeWidth="2.5" />
            
            {/* Green Buffer boundary at the bottom */}
            <rect x="10" y="210" width="380" height="20" rx="4" fill="#fee2e2" stroke="#b91c1c" strokeWidth="1" strokeDasharray="3,3" />
            <text x="200" y="222" fill="#b91c1c" fontSize="8" fontWeight="bold" textAnchor="middle">WATERBODY / SETBACK / BUFFER ZONE</text>
            
            {/* Main Road */}
            <rect x="10" y="30" width="380" height="30" fill="#8b6e3a" opacity="0.9" />
            <line x1="10" y1="45" x2="390" y2="45" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="5,5" />
            <text x="200" y="49" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">MAIN ROAD CONNECTIVITY</text>
            
            {/* Internal Roads */}
            <rect x="100" y="60" width="25" height="150" fill="#8b6e3a" opacity="0.8" />
            <rect x="280" y="60" width="25" height="150" fill="#8b6e3a" opacity="0.8" />
            
            {/* Parks / Open Space */}
            <rect x="25" y="70" width="65" height="50" rx="4" fill="#10b981" opacity="0.85" stroke="#047857" strokeWidth="1" />
            <text x="57" y="100" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">PARK ZONE</text>
            
            {/* Civic Amenity block */}
            <rect x="25" y="130" width="65" height="50" rx="4" fill="#f59e0b" opacity="0.85" stroke="#b45309" strokeWidth="1" />
            <text x="57" y="160" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">CIVIC AMENITY</text>
            
            {/* Utility yard */}
            <rect x="315" y="70" width="60" height="40" rx="4" fill="#6b7280" opacity="0.85" stroke="#374151" strokeWidth="1" />
            <text x="345" y="93" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">STP/UTILITY</text>
            
            {/* Plotted grids */}
            <rect x="135" y="70" width="60" height="30" rx="2" fill="#10291f" opacity="0.9" />
            <text x="165" y="88" fill="#ffffff" fontSize="8" textAnchor="middle">PLOTS 1-4</text>
            
            <rect x="210" y="70" width="60" height="30" rx="2" fill="#10291f" opacity="0.9" />
            <text x="240" y="88" fill="#ffffff" fontSize="8" textAnchor="middle">PLOTS 5-8</text>
            
            <rect x="135" y="120" width="60" height="30" rx="2" fill="#10291f" opacity="0.9" />
            <text x="165" y="138" fill="#ffffff" fontSize="8" textAnchor="middle">PLOTS 9-12</text>
            
            <rect x="210" y="120" width="60" height="30" rx="2" fill="#10291f" opacity="0.9" />
            <text x="240" y="138" fill="#ffffff" fontSize="8" textAnchor="middle">PLOTS 13-16</text>
          </svg>
        </div>
      </div>

      {/* Legend & Notes with Areas & Percentages */}
      <div className="grid grid-cols-2 gap-4 text-[10px] border-t border-slate-100 pt-4">
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 bg-[#10291f] rounded"></span>
          <span className="font-bold text-[#1f2a24]">Saleable Plots: {saleablePct}% ({Math.round(saleableSqft).toLocaleString()} sq.ft)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 bg-[#8b6e3a] rounded"></span>
          <span className="font-bold text-[#1f2a24]">Roads/Circulation: {roadPct}% ({Math.round(roadSqft).toLocaleString()} sq.ft)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 bg-[#10b981] rounded"></span>
          <span className="font-bold text-[#1f2a24]">Parks/Open Space: {parkPct}% ({Math.round(parkSqft).toLocaleString()} sq.ft)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 bg-[#f59e0b] rounded"></span>
          <span className="font-bold text-[#1f2a24]">Civic Amenities/CA: {caPct}% ({Math.round(caSqft).toLocaleString()} sq.ft)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 bg-slate-600 rounded"></span>
          <span className="font-bold text-[#1f2a24]">Utilities/Services: {utilityPct}% ({Math.round(utilitySqft).toLocaleString()} sq.ft)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 bg-rose-700 rounded"></span>
          <span className="font-bold text-[#1f2a24]">Drains/Buffers: {bufferPct}% ({Math.round(bufferSqft).toLocaleString()} sq.ft)</span>
        </div>
      </div>

      <div className="bg-[#f8f5ef] border border-gold-elegant p-4 rounded text-[10px] text-[#5f6b63] leading-relaxed">
        <strong>Indicative layout drawing only.</strong> Final layout must be prepared by a licensed planner/surveyor/architect and approved by the relevant authority.
      </div>
    </Card>
  );
};
