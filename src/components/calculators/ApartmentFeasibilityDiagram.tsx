import React from "react";
import { Card } from "@/components/ui/Card";

interface ApartmentFeasibilityDiagramProps {
  authorityName: string;
  totalLandSqft: number;
  builtUpSqft: number;
  saleableSqft: number;
  groundCoverageSqft: number;
  openSpaceSqft: number;
  parkingSqft: number;
  totalUnits: number;
  contingencyPercent: number;
}

export const ApartmentFeasibilityDiagram = ({
  authorityName,
  totalLandSqft,
  builtUpSqft,
  saleableSqft,
  groundCoverageSqft,
  openSpaceSqft,
  parkingSqft,
  totalUnits,
  contingencyPercent
}: ApartmentFeasibilityDiagramProps) => {
  
  // Percentages
  const gcPct = Math.round((groundCoverageSqft / totalLandSqft) * 100);
  const openPct = Math.max(0, 100 - gcPct);

  return (
    <Card className="p-6 bg-white border border-gold-elegant space-y-6 font-sans text-xs text-[#1f2a24]">
      <div>
        <h3 className="font-serif text-base font-bold text-[#10291f] mb-1">Indicative Apartment Massing & Zoning</h3>
        <span className="text-[9px] uppercase font-bold text-[#5f6b63] tracking-widest block">
          Zoning Potential Model · Indicative Only
        </span>
      </div>

      {/* 1. Footprint stacked bar */}
      <div className="space-y-2">
        <span className="block font-bold text-[10px] text-[#5f6b63] uppercase">Land Coverage Footprint</span>
        <div className="w-full h-8 rounded-lg overflow-hidden flex shadow-inner border border-slate-100">
          <div 
            style={{ width: `${gcPct}%` }} 
            className="bg-[#10291f] h-full flex items-center justify-center text-[9px] font-bold text-white transition-all"
            title={`Proposed Ground Coverage: ${gcPct}%`}
          >
            Ground Coverage {gcPct}%
          </div>
          <div 
            style={{ width: `${openPct}%` }} 
            className="bg-[#8b6e3a] h-full flex items-center justify-center text-[9px] font-bold text-white transition-all"
            title={`Required Open Space: ${openPct}%`}
          >
            Open Setbacks {openPct}%
          </div>
        </div>
      </div>

      {/* 2. Conceptual Massing Diagram (SVG) */}
      <div className="space-y-2">
        <span className="block font-bold text-[10px] text-[#5f6b63] uppercase">Conceptual Tower & Setback Sketch</span>
        <div className="bg-[#f8f5ef]/50 border border-slate-100 rounded-lg p-4 flex justify-center items-center">
          <svg viewBox="0 0 400 240" className="w-full max-w-[400px] h-auto drop-shadow-sm">
            {/* Base land boundary */}
            <rect x="10" y="10" width="380" height="220" rx="10" fill="#ffffff" stroke="#10291f" strokeWidth="2.5" />
            
            {/* Front Setback line */}
            <line x1="10" y1="50" x2="390" y2="50" stroke="#b91c1c" strokeWidth="1" strokeDasharray="4,4" />
            <text x="200" y="44" fill="#b91c1c" fontSize="8" fontWeight="bold" textAnchor="middle">FRONT SETBACK BUFFER</text>
            
            {/* Rear Setback line */}
            <line x1="10" y1="190" x2="390" y2="190" stroke="#b91c1c" strokeWidth="1" strokeDasharray="4,4" />
            
            {/* Side Setback line left */}
            <line x1="50" y1="10" x2="50" y2="230" stroke="#b91c1c" strokeWidth="1" strokeDasharray="4,4" />
            
            {/* Side Setback line right */}
            <line x1="350" y1="10" x2="350" y2="230" stroke="#b91c1c" strokeWidth="1" strokeDasharray="4,4" />
            
            {/* Tower Footprint representing Ground Coverage */}
            <rect x="70" y="70" width="260" height="100" rx="6" fill="#10291f" opacity="0.9" stroke="#8b6e3a" strokeWidth="2" />
            <text x="200" y="115" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">PROPOSED APARTMENT TOWER</text>
            <text x="200" y="132" fill="#d9c79f" fontSize="8" textAnchor="middle">{totalUnits} Units planned across floors</text>

            {/* Parking yard representing stilt/basement limits */}
            <rect x="70" y="175" width="260" height="10" rx="1" fill="#6b7280" opacity="0.8" />
            <text x="200" y="183" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">BASEMENT / STILT PARKING FLOOR</text>
            
            {/* Play area/Landscape */}
            <rect x="15" y="70" width="30" height="100" rx="4" fill="#10b981" opacity="0.85" stroke="#047857" strokeWidth="1" />
            <text x="30" y="125" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 30, 125)">LANDSCAPE</text>
          </svg>
        </div>
      </div>

      {/* Legend & Notes with Areas & Percentages */}
      <div className="grid grid-cols-2 gap-4 text-[10px] border-t border-slate-100 pt-4">
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 bg-[#10291f] rounded"></span>
          <span className="font-bold text-[#1f2a24]">Built-up Potential: {Math.round(builtUpSqft).toLocaleString()} sq.ft</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 bg-[#8b6e3a] rounded"></span>
          <span className="font-bold text-[#1f2a24]">Net Saleable Area: {Math.round(saleableSqft).toLocaleString()} sq.ft</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 bg-slate-600 rounded"></span>
          <span className="font-bold text-[#1f2a24]">Parking required: {Math.round(parkingSqft).toLocaleString()} sq.ft</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3.5 h-3.5 bg-emerald-700 rounded"></span>
          <span className="font-bold text-[#1f2a24]">Open Land space: {Math.round(openSpaceSqft).toLocaleString()} sq.ft</span>
        </div>
      </div>

      <div className="bg-[#f8f5ef] border border-gold-elegant p-4 rounded text-[10px] text-[#5f6b63] leading-relaxed">
        <strong>Indicative only.</strong> Final apartment design must be prepared by a licensed architect/planner/engineer and approved by the relevant authority.
      </div>
    </Card>
  );
};
export default ApartmentFeasibilityDiagram;
