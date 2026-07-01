import React from "react";

export const CalculatorDisclaimer = () => {
  return (
    <div className="bg-[#f8f5ef] border border-[#d9c79f]/50 p-4 rounded text-[11px] text-slate-500 leading-relaxed font-sans mt-8 shadow-xs">
      <div className="flex items-start space-x-2">
        <span className="text-[#8b6e3a] font-bold text-base leading-none">⚠️</span>
        <div>
          <span className="font-bold text-[#10291f] uppercase tracking-wide block mb-1">Advisory Planning Disclaimer</span>
          <p>
            Planning estimate only — verify with banks, government authorities, developers, licensed professionals, and independent legal/financial advisors before making any decision. All rates, taxes, allocations, and projections are illustrative planning assumptions and do not constitute legal, financial, or contractually binding options.
          </p>
        </div>
      </div>
    </div>
  );
};
