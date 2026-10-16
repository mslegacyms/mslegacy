import React from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { LayoutDevelopmentCalculator } from "@/components/calculators/LayoutDevelopmentCalculator";

export const metadata: Metadata = {
  title: "Layout Development & Investor Feasibility Calculator | MS Legacy",
  description: "Estimate BDA, BMRDA, e-Swathu Gram Panchayat, and DTCP land allocations, road layouts, infrastructure costs, and project launch budgets with MS Legacy."
};

export default function LayoutDevelopmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5ef] text-[#10291f] font-sans">
      {/* Hero */}
      <section className="bg-dark-luxury-gradient text-white py-24 relative overflow-hidden bg-luxury-grid border-b border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <Badge variant="gold" className="px-3 border border-gold-elegant">Developer Advisory Tools</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Layout Development Feasibility Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Calculate road allocations, park areas, civic amenities, statutory conversion fees, and investor capital outlays before project launch.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-6">
          <LayoutDevelopmentCalculator />
        </div>
      </section>
    </div>
  );
}
