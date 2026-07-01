import React from "react";
import { Metadata } from "next";
import { DetailedConstructionCalculator } from "@/components/calculators/DetailedConstructionCalculator";

export const metadata: Metadata = {
  title: "Construction Cost Calculator | MS Legacy",
  description: "Estimate civil construction, interior design, regulatory approvals, PMC fees, utility services, and cash flows. Planning estimates only."
};

export default function ConstructionCostPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans pb-16">
      <section className="bg-dark-luxury-gradient text-white py-16 relative overflow-hidden bg-luxury-grid border-b border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <span className="bg-[#8b6e3a] text-white text-[9px] uppercase font-bold px-2.5 py-1 rounded tracking-wider border border-[#8b6e3a]/30">
            Construction & Plots
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white animate-pulse">
            Detailed Construction Cost Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Estimate structural, finishing, woodworks, landscaping, regulatory, and PM fee components.
          </p>
        </div>
      </section>

      <section className="py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-6">
          <DetailedConstructionCalculator />
        </div>
      </section>
    </div>
  );
}
